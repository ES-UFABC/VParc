const User = require("../models/User");

function newErrorMessage(message, error) {
    return {
        status: false,
        message,
        error
    }
}
class UserRepository {

    async create(user) {

        const { first_name, last_name, email, ra, cellphone, hash, salt } = user;

        const newUser = new User({
            first_name,
            last_name, 
            email, 
            ra, 
            cellphone, 
            hash,
            salt
        });

        try {

            const result = await newUser.save();

            return {
                status: true,
                message: "SUCCESS",
                data: {
                    result
                }
            };

        } catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);

        }

    }

    async update(user) {

        try {

            const { id, first_name, last_name, email, ra, cellphone, hash, salt, active } = user;
            
            await User.updateOne(
                { _id: id }, 
                { first_name, last_name, email, ra, cellphone, hash, salt, active }
            );

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

            const result = await User.findByIdAndDelete(id);

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
            return newErrorMessage("ERROR", err);

        }

    }

    async findByEmail(email) {

        try {

            const result = await User.find().where({
                email: email
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

    async findByRA(ra) {

        try {

            const result = await User.find().where({
                ra: ra
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

    async findById(id) {

        try {

            const result = await User.find().where({
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

module.exports = new UserRepository();