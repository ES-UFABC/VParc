const CategoryRepository = require("../repositories/CategoryRepository");

const CategoryValidator = require("../validators/CategoryValidator");

class CategoryController {

    // (GET) /category
    async findAll(req, res) {

        const result = await CategoryRepository.findAll();

        if (result.status == false) {

            res.status(500);
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

    // (GET) /category/:id
    async findById(req, res) {

        const id = req.params.id;

        const result = await CategoryRepository.findById(id);

        if (result.status == false) {
            res.status(404); // not found
            res.json({
                status: false,
                message: "Categoria não existe."
            });
            return;
        }

        res.status(200); // ok
        res.json({
            status: true,
            data: result.data 
        });

    }

    // (POST) /category/:newCategory
    async create(req, res) {

        const newCategory = req.params.newCategory;

        const errors = await CategoryValidator.validateNew(newCategory);

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

        // check if the category exists
        const response = await CategoryRepository.findByDescription(newCategory);

        if (response.status == true) {

            res.status(400); // bad request
            res.json({
                status: false,
                message: "Categoria já existente no sistema."
            });
            return;

        }

        const category = {
            description: newCategory
        }

        const result = await CategoryRepository.create(category);

        if (result.status == true) {

            res.status(201); // created
            res.json({
                status: true,
                message: "Categoria criada com sucesso!"
            });

        } else {

            res.status(500); // internal server error
            res.json({
                status: false,
                message: "Ocorreu uma falha interna!"
            });

        }

    }

    // (DELETE) /category/:id
    async delete(req, res) {

        const id = req.params.id;

        const result = await CategoryRepository.deleteById(id);

        if (result.status == false) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "Categoria não existe."
            });
            return;
        }

        res.status(200); // ok
        res.json({
            status: true,
            message: "Categoria excluída."
        });

    }

}

module.exports = new CategoryController();