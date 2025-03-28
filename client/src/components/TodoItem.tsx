import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from "@/components/ui/color-mode";

type Todo = {
  body: string;
  completed: boolean;
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const bgColor = useColorModeValue("gray.400", "gray.700");

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
      <Flex gap={2} alignItems={"center"}>
        <Box color={"green.500"} cursor={"pointer"}>
          <FaCheckCircle size={20} />
        </Box>
        <Box color={"red.500"} cursor={"pointer"}>
          <MdDelete size={25} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default TodoItem;
