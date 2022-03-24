const AdvertisementRepository = require("../repositories/AdvertisementRepository");

const AdvertisementValidator = require("../validators/AdvertisementValidator");

class AdvertisementController {

    // (POST) /advertisement
    async create(req, res) {

        const data = req.body; // retrieve data from the body's request

        // validate the data
        const errors = await AdvertisementValidator.validateNew(data);

        if (errors.length > 0) {

            res.status(400); // bad request
            res.json({
                status: false,
                message: "Dados inválidos!",
                data: {
                    length: errors.length,
                    errors
                }
            });
            return;

        }

        // create the advertisement
        const advertisement = {
            title: data.title,
            description: data.description,
            price: data.price,
            bookCondition: data.bookCondition,
            categoryIds: data.categoryIds,
            userId: req.userId
        }

        const result = await AdvertisementRepository.create(advertisement);

        if (result.status == true) {

            res.status(201); // created
            res.json({
                status: true,
                message: "Anúncio criado com sucesso!"
            });

        } else {

            res.status(500); // internal server error
            res.json({
                status: false,
                message: "Ocorreu uma falha interna!"
            });

        }

    }
    
    // (GET) /advertisement
    async findAll(req, res) {

        const result = await AdvertisementRepository.findAll();

        if (result.status == false) {

            res.status(500); // internal server error
            res.json({
                status: false,
                message: "Ocorreu uma falha interna!"
            });
            return;

        }

        res.status(200); // ok
        res.json({
            status: true,
            data: result.data
        });

    }

    // (GET) /advertisement/:id
    async findById(req, res) {

        const id = req.params.id;

        const result = await AdvertisementRepository.findById(id);

        if (result.status == false) {

            res.status(400); // bad request
            res.json({
                status: false,
                message: "Anúncio não existe."
            });
            return;

        }

        res.status(200); // ok
        res.json({
            status: true,
            data: result.data
        });

    }

    // (DELETE) /advertisement/:id
    async delete(req, res) {

        const id = req.params.id;

        if (await AdvertisementValidator.validateOwnership(id, req.userId, req.admin) == false) {
            res.status(403); // forbidden
            res.json({
                status: false,
                message: "Você não tem permissão para deletar este anúncio."
            });
            return;
        }

        const result = await AdvertisementRepository.deleteById(id);

        if (result.status == false) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "Anúncio não existe."
            });
            return;
        }

        res.status(200); // ok
        res.json({
            status: true,
            message: "Anúncio excluído."
        });

    }

}

module.exports = new AdvertisementController();