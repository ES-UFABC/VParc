const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NAMES = require("../database/names");

const User = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ra: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    type: {
        type: String,
        enum: ["admin", "user"],
        required: true,
        default: "user"
    }
});

mongoose.model(NAMES.USERS, User);

module.exports = mongoose.model(NAMES.USERS);
