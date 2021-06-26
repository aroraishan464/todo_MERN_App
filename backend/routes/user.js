const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { getUserById, getUser, updateUser, getTodoList, changePassword } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

//get
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//update user
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//change password
router.put(
    "/user/changePassword/:userId",
    [
        check("oldPassword", "old password should be at least 5 characters").isLength({ min: 5 }),
        check("newPassword", "new password should be at least 5 characters").isLength({ min: 5 })
    ], isSignedIn, isAuthenticated, changePassword);

//get todo List
router.get("/user/todo-list/:userId", isSignedIn, isAuthenticated, getTodoList);

module.exports = router;