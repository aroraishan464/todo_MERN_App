const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
var AWS = require("aws-sdk");
const uuidv1 = require("uuid/v1");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const Todo = require("../models/todo");

//get user by id middleware
//find user by id and store user in req.profile
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No such user is found"
            });
        }

        req.profile = user;
        next();
    });
};

//return req.profile after removing password and salt field
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

//update user controller
exports.updateUser = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }

        //updation code
        let user = req.profile;
        user = _.extend(user, fields);

        //saving profile pic in AWS S3 bucket
        if (file.profilePic.size != 0 ) {

            const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

            let s3bucket = new AWS.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY_ID,
                region: process.env.AWS_REGION
            });

            let profilePicName = req.profile.profilePicName;
            if (typeof (profilePicName) === "undefined") {
                var filename = uuidv1();
            }
            else{
                var filename = profilePicName;
            }
            var params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: filename,
                Body: fs.readFileSync(file.profilePic.path),
                ContentType: file.profilePic.type,
                ACL: "public-read"
            };

            s3bucket.upload(params, (err, data) => {
                if (err) {
                    res.status(500).json({
                        error: true, Message: err
                    });
                }
            });
            user.profilePicLink = s3FileURL + params.Key;
            user.profilePicName = params.Key;
        }

        //updating user in DB
        user.save((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Updation of user failed"
                });
            }
            return res.json({
                success: "user updated successfully changes will applied on the next login"
            });
        });
    });
}

//change password controller
exports.changePassword = (req, res) => {
    const errors = validationResult(req);
    const { oldPassword, newPassword } = req.body;

    const {email} = req.profile;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "no user is registered with this email"
            });
        }

        if (!user.authenticate(oldPassword)) {
            return res.status(401).json({
                error: "incorrect old password"
            });
        }

        user.password = newPassword;
        user.save((err, user) => {
            if (err || !user) {
                return res.status(400).json({ error: "could not set email" });
            }
            return res.json({
                success: "password successfully changed"
            });
        })
    });
}

//get todo list from user schema controller
exports.getTodoList = (req, res) => {
    Todo.find({ '_id': { $in: req.profile.todoList } }).exec((err, todos) => {
        return res.json(todos.reverse());
    });
}

