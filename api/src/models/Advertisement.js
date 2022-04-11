const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NAMES = require("../database/names");
const ENUMS = require("../database/enums");

const Advertisement = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    bookCondition: {
        type: String,
        enum: ENUMS.ADVERTISEMENT.BOOK_CONDITION,
        required: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    categoryIds: {
        type: [mongoose.ObjectId]
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

mongoose.model(NAMES.ADVERTISEMENTS, Advertisement);

module.exports = mongoose.model(NAMES.ADVERTISEMENTS);
