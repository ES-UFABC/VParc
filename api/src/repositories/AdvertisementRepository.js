const Advertisement = require("../models/Advertisement");

function newErrorMessage(message, error) {
    return {
        status: false,
        message,
        error
    }
}

class AdvertisementRepository {

    async create(advertisement) {

        const { title, description, price, bookCondition, categoryIds, userId } = advertisement;

        const newAdvertisement = new Advertisement({
            title, 
            description, 
            price, 
            bookCondition, 
            categoryIds, 
            userId
        });

        try {

            await newAdvertisement.save();

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

            const result = await Advertisement.findByIdAndDelete(id);

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
    
            const result = await Advertisement.find().lean();

            return {
                status: true,
                data: {
                    length: result.length,
                    result
                }
            };

        } catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);

        }

    }

    async findById(id) {

        try {

            const result = await Advertisement.find().where({
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

module.exports = new AdvertisementRepository();
