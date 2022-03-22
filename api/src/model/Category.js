const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NAMES = require("../database/names");

const Category = new Schema({
    description: {
        type: String,
        required: true
    }
});

mongoose.model(NAMES.CATEGORIES, Category);