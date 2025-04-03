# Todo-with-Go

This is a simple Todo application built with Go (Golang) for the backend and a modern front-end framework. The project demonstrates how to create a full-stack application with a focus on clean architecture, scalability, and maintainability.

## Features

- Add, edit, and delete tasks.
- Mark tasks as completed.
- Persistent storage for tasks.
- RESTful API built with Go.
- Responsive front-end for seamless user experience.

## Technologies Used

### Backend

- **Go (Golang)**: For building the RESTful API.
- **Gin**: A lightweight web framework for Go.
- **MongoDB**: NoSQL database for storing tasks.

## Environment Variables

Create a `.env` file in the root directory of the backend to configure the application. Below is an example of the `.env` file for this project:

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017

# Server port
PORT=5000

# Environment mode
ENV=development
```

Make sure to replace the values with your own configuration as needed.
