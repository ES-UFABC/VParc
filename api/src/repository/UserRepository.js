const mongoose = require("mongoose");
const NAMES = require("../database/names");

require("../model/User");
const User = mongoose.model(NAMES.USERS);

class UserRepository {

    async create(user) {

        const { first_name, last_name, email, ra, cellphone, hash } = user;

        const newUser = new User({
            first_name,
            last_name, 
            email, 
            ra, 
            cellphone, 
            hash
        });

        try {

            await newUser.save();

            return {
                status: true,
                message: "Usuário Cadastrado!"
            };

        } catch (err) {

            console.log(err);

            return {
                status: false,
                message: "Ocorreu um erro!",
                error: err
            };

        }

    }

    async findAll() {

        try {

            const result = await User.find().lean();

            return {
                status: true,
                data: {
                    length: result.length,
                    result
                }
            }

        } catch (err) {

            console.log(err);

            return {
                status: false,
                message: "Ocorreu um erro!",
                error: err
            };

        }

    }

}

module.exports = new UserRepository();