import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Todo } from "@/components/TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/App";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const bgColor = useColorModeValue("gray.400", "gray.700");
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo is Already Completed");
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + `/todos/${todo._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Flex gap={2} alignItems={"center"}>
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px solid"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
        bg={bgColor}
      >
        <Text
          color={todo.completed ? "green.200" : "yellow.100"}
          textDecoration={todo.completed ? "line-through" : "none"}
          fontWeight={"bold"}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml="1" colorPalette="green">
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml="1" colorPalette="yellow">
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={"center"} >
        <Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
          {isUpdating ? <Spinner size={"sm"} /> : <FaCheckCircle size={20} />}
        </Box>
        <Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
          {isDeleting ? <Spinner size={"sm"} /> : <MdDelete size={25} />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
