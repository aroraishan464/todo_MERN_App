const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

//creating user Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userInfo: {
    type: String,
    maxlength: 150
  },
  salt: String,
  encry_password: {
    type: String,
    required: true
  },
  todoList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Todo",
    unique: false
  },
  profilePicName: {
    type: String
  },
  profilePicLink: {
    type: String
  }
}, { timestamps: true });

userSchema
  .virtual("password")
  //encrypting password before storing in DB
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//adding methods for user schema
userSchema.methods = {
  //To authenticate plain password with encrypted password in DB
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  //To encrypt password before storing in DB
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return conosle.log(err);
    }
  }
};

module.exports = mongoose.model("User", userSchema);