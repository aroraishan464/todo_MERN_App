const Todo = require("../models/todo");
const User = require("../models/user");
const _ = require("lodash");

//get todo by id middleware
//find todo by id and store todo in req
exports.getTodoById = (req, res, next, id) => {
    Todo.findById(id).exec((error, todo) => {
        if (error || !todo) {
            return res.status(400).json({
                error: "todo not found"
            });
        }
        req.todo = todo;
        next();
    })
};

//create todo controller
exports.createTodo = (req, res) => {
    const todo = new Todo(req.body);
    //saving new todo in DB
    todo.save((err, todo) => {
        if (err || !todo) {
            return res.status(400).json({
                error: "todo already exist"
            });
        }
        req.profile.todoList.push(todo);
        //updating todoList in user
        User.findByIdAndUpdate(
            { _id: req.profile._id },
            { "todoList": req.profile.todoList },
            { new: true, useFindAndModify: false },
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "You are not authorized to update this user"
                    });
                }
                return res.json({
                    success: "The todo is created"
                });
            }
        );
    });
}

//update todo controller
exports.updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(
        { _id: req.todo._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, todo) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                });
            }
            return res.json({
                success: "The todo is updated"
            });
        }
    );
}

//deleting todo controller
exports.deleteTodo = (req, res) => {
    const removedTodo = _.remove(req.profile.todoList, value => value == req.todo.id);
    //deleting todo
    req.todo.remove((err, deletedTodo) => {
        if (err || !deletedTodo) {
            return res.status(400).json({
                error: "Could not delete the Todo"
            });
        }
        
        //updating todoList in user
        User.findByIdAndUpdate(
            { _id: req.profile._id },
            { "todoList": req.profile.todoList },
            { new: true, useFindAndModify: false },
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "You are not authorized to update this user"
                    });
                }
                return res.json({
                    success: "The todo is deleted"
                });
            }
        );
    })
}

