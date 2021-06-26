const User = require("../models/user");
const jwt = require('jsonwebtoken');
var expressJwt = require("express-jwt");
const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");

const { validationResult } = require("express-validator");

//signup controller
exports.signup = (req, res) => {
    //form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    //destructuring name, email and password from request body
    const { name, email, password } = req.body;
    
    //checking for user using email in DB and sending verification email
    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "User with this email already exist"
            });
        }

        res.json({
            success: "Email has been sent. Please activate your account"
        });

        //generating token for email verification
        const token = jwt.sign({ name, email, password }, process.env.SECRET, { expiresIn: "20m" });

        //sending verification email using AWS SES
        //configuring aws sdk
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY_ID,
            region: process.env.AWS_REGION
        });

        const ses = new AWS.SES({ apiVersion: "2010-12-01" });
        const params = {
            Destination: {
                ToAddresses: [email] // Email address/addresses that you want to send your email
            },
            Message: {
                Body: {
                    Html: {
                        // HTML Format of the email containing backend verification API along with verfication token
                        Charset: "UTF-8",
                        Data:
                            `<h3> Welcome ${name} to TODO</h3>
                            <h1> Click on the activation link below to activate your account: </h1>
                            <h3><a href="${process.env.BACKEND}/api/activate/${token}">activate</a></h3>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: `Welcome ${name} to TODO
                               Click on the activation link below to activate your account:
                               activate`
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Test email"
                }
            },
            Source: "gypsydanger464@gmail.com" //your SES verified email here
        };

        const sendEmail = ses.sendEmail(params).promise();

        sendEmail
            .then(data => {
                console.log("email submitted to SES");
            })
            .catch(error => {
                console.log(error);
            });
    });
}

//accound activation controller
exports.activate = (req, res) => {
    const token = req.params.token;
    //verifying token
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(400).json({
                error: "Invalid or expired link"
            });
        }
        const { name, email, password } = decodedToken;
        //storing user in DB
        const user = new User({ name, email, password });
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    err
                });
            }
            return res.redirect(process.env.FRONTEND_AUTHPAGE);
        });
    });
}

//signin controller
exports.signin = (req, res) => {
    //form validation 
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    //finding user in DB
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "no user is registered with this email"
            });
        }

        //authenticating password after finding user
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }

        //creating token and storing in response
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        // res.cookie("token", token, { expire: new Date() + 9999 });
        res.cookie("token", token, { maxAge: 31536000 });

        //returning response containing token and user object
        const { _id, name, email, userInfo, profilePicLink, profilePicName } = user;
        return res.json({ token, user: { _id, name, email, userInfo, profilePicName, profilePicLink } });
    });
};

//signout controller
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
};

//checking email and send email for forget password controller
exports.checkAndSendForgetEmail = (req, res) => {
    //form validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const { email } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user is registered with this email"
            });
        }

        res.json({
            success: "Please check your email"
        });

        //sending token
        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "20m" });

        //sending verification email befor reseting password
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY_ID,
            region: process.env.AWS_REGION
        });

        const ses = new AWS.SES({ apiVersion: "2010-12-01" });
        const params = {
            Destination: {
                ToAddresses: [email] // Email address/addresses that you want to send your email
            },
            Message: {
                Body: {
                    Html: {
                        // HTML Format of the email
                        Charset: "UTF-8",
                        Data:
                            `<h1> Click on the below link to reset your password: </h1>
                             <h3><a href="${process.env.FRONTEND_RESETPASS}/${token}">Reset password</a></h3>
                             <h4> Please ignore if it wasn't for you </h40>`
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: `Click on the below link to reset your account:
                                Reset password
                                Please ignore if it wasn't for you`
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Test email"
                }
            },
            Source: "gypsydanger464@gmail.com"  //your SES verified email here
        };

        const sendEmail = ses.sendEmail(params).promise();

        sendEmail
            .then(data => {
                console.log("email submitted to SES", data);
            })
            .catch(error => {
                console.log(error);
            });
    });
};

//reset password controller
exports.resetPassword = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    const { password } = req.body;
    const token = req.params.token;
    //verifying token before updating password
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                error: "Email link is expired. Please send the verification email again."
            });
        }
        const { email } = decodedToken;
        User.findOne({ email }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User with this email already exist"
                });
            }
            user.password = password;
            user.save((err, user) => {
                if (err || !user) {
                    return res.status(400).json({ error: "could not set email" });
                }
                res.json({
                    success: "successfully reset password"
                });
            })
        });
    });
}

//middlewares for checking if signed in
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});

//middlewares for checking if authenticated
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};