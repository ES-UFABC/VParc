const mongoose = require("mongoose");
const NAMES = require("../database/names");

require("../model/Category");
const Category = mongoose.model(NAMES.CATEGORIES);

// TODO: move this function somewhere else
function newErrorMessage(message, error) {
    return {
        status: false,
        message,
        error
    }
}

class CategoryRepository {

    async create(category) {

        const { description } = category;

        const newCategory = new Category({
            description
        });

        try {

            await newCategory.save();

            return {
                status: true,
                message: "SUCCESS"
            };
            
        } catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);

        }

    }

    async deleteById(id) {

        try {

            const result = await Category.findByIdAndDelete(id);

            if (result) {

                return {
                    status: true,
                    message: "SUCCESS"
                };

            } else {
                return newErrorMessage("NOT FOUND");
            }

        } catch (err) {
            
            console.log(err);
            return newErrorMessage("ERROR", err);

        }

    }

    async findAll() {

        try {

            const result = await Category.find().lean();

            return {
                status: true,
                data: {
                    length: result.length,
                    result
                }
            }

        } catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);

        }

    }

    async findById(id) {

        try {

            const result = await Category.find().where({
                _id: id
            }).lean();

            if (result.length > 0) {

                return {
                    status: true,
                    data: {
                        length: result.length,
                        result
                    }
                }

            } else {

                return newErrorMessage("NOT FOUND")

            }
            
        } catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);
            
        }

    }

}

module.exports = new CategoryRepository();