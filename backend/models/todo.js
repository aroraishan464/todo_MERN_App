const mongoose = require("mongoose");

//creating Schema for single todo
const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Todo", TodoSchema);