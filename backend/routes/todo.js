const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getTodoById, createTodo, updateTodo, deleteTodo } = require("../controllers/todo");

router.param("todoId", getTodoById);
router.param("userId", getUserById);

//create
router.post("/todo/create/:userId", isSignedIn, isAuthenticated, createTodo);

//update
router.put("/todo/:userId/:todoId", isSignedIn, isAuthenticated, updateTodo);

//delete
router.delete("/todo/:userId/:todoId", isSignedIn, isAuthenticated, deleteTodo);

module.exports = router