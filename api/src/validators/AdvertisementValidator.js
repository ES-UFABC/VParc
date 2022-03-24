const validator = require("validator");

const ENUMS = require("../database/enums");

const CategoryValidator = require("./CategoryValidator");

const AdvertisementRepository = require("../repositories/AdvertisementRepository");

class AdvertisementValidator {

    async validateOwnership(advertisementId, userId, admin) {

        if (admin) return true;

        const advertisement = await AdvertisementRepository.findById(advertisementId);

        if ( advertisement.status == false ) {
            return false;
        }

        if ( advertisement.data.result[0].userId != userId ) {
            return false;
        }

        return true;

    }

    async validateNew(advertisement) {
        const { title, description, price, bookCondition, categoryIds, userId } = advertisement;
        var errors = [];

        if ( !title || validator.isEmpty(String(title), { ignore_whitespace: true }) ) {
            errors.push({
                field: "title",
                error: "O campo não pode ser vazio."
            });
        }
        if ( !description || validator.isEmpty(String(description), { ignore_whitespace: true }) ) {
            errors.push({
                field: "description",
                error: "O campo não pode ser vazio."
            });
        }
        if ( !price || typeof price !== "number" || price < 0 ) {
            errors.push({
                field: "price",
                error: "Preço inválido."
            });
        }
        if ( !bookCondition || validator.isEmpty(String(bookCondition), { ignore_whitespace: true }) ) {
            errors.push({
                field: "bookCondition",
                error: "O campo não pode ser vazio."
            });
        }
        if ( ENUMS.ADVERTISEMENT.BOOK_CONDITION.includes(bookCondition || "") == false ) {
            errors.push({
                field: "bookCondition",
                error: "Condição do livro inválida."
            });
        }
        if ( !categoryIds || Array.isArray(categoryIds) == false ) {
            errors.push({
                field: "categoryIds",
                error: "O array de categorias é inválido."
            });
        }
        if ( await CategoryValidator.validateIds(categoryIds) == false ) {
            errors.push({
                field: "categoryIds",
                error: "Algum dos IDs das categorias é inválido."
            });
        }

        return errors;

    }

}

module.exports = new AdvertisementValidator();