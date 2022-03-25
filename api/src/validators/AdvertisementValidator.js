const validator = require("validator");

const ENUMS = require("../database/enums");

const CategoryValidator = require("./CategoryValidator");

const AdvertisementRepository = require("../repositories/AdvertisementRepository");

class AdvertisementValidator {

    #validateText(text) {
        if (!text || validator.isEmpty(String(text), { ignore_whitespace: true }) ) {
            return false;
        }
        return true;
    }

    #validateNumber(number) {
        if ( number == null || typeof number !== "number" || number < 0 ) {
            return false;
        }
        return true;
    }

    #validateArray(obj) {
        if ( !obj || Array.isArray(obj) == false ) {
            return false;
        }
        return true;
    }

    async #validateArrayItems(array) {
        return await CategoryValidator.validateIds(array);
    }

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
        const { title, description, price, bookCondition, categoryIds } = advertisement;
        var errors = [];

        if ( !this.#validateText(title) ) {
            errors.push({
                field: "title",
                error: "O campo não pode ser vazio."
            });
        }
        if ( !this.#validateText(description) ) {
            errors.push({
                field: "description",
                error: "O campo não pode ser vazio."
            });
        }
        if ( !this.#validateNumber(price) ) {
            errors.push({
                field: "price",
                error: "Preço inválido."
            });
        }
        if ( !this.#validateText(bookCondition) ) {
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
        if ( !this.#validateArray(categoryIds) ) {
            errors.push({
                field: "categoryIds",
                error: "O array de categorias é inválido."
            });
        }
        if ( await this.#validateArrayItems(categoryIds) == false ) {
            errors.push({
                field: "categoryIds",
                error: "Algum dos IDs das categorias é inválido."
            });
        }

        return errors;

    }

    async validateUpdate(advertisement) {
        const { title, description, price, bookCondition, categoryIds } = advertisement;
        var errors = [];

        if (title !== undefined && !this.#validateText(title) ) {
            errors.push({
                field: "title",
                error: "O campo não pode ser vazio."
            });
        }
        if (description !== undefined && !this.#validateText(description) ) {
            errors.push({
                field: "description",
                error: "O campo não pode ser vazio."
            });

        }
        if (price !== undefined && !this.#validateNumber(price) ) {
            errors.push({
                field: "price",
                error: "Preço inválido."
            });
        }
        if (bookCondition !== undefined && !this.#validateText(bookCondition) ) {
            errors.push({
                field: "bookCondition",
                error: "O campo não pode ser vazio."
            });
        }
        if (bookCondition !== undefined && this.#validateText(bookCondition) ) {
            if ( ENUMS.ADVERTISEMENT.BOOK_CONDITION.includes(bookCondition || "") == false ) {
                errors.push({
                    field: "bookCondition",
                    error: "Condição do livro inválida."
                });
            }
        }
        if (categoryIds !== undefined && !this.#validateArray(categoryIds) ) {
            errors.push({
                field: "categoryIds",
                error: "O array de categorias é inválido."
            });
        }
        if (categoryIds !== undefined && await this.#validateArrayItems(categoryIds) == false ) {
            errors.push({
                field: "categoryIds",
                error: "Algum dos IDs das categorias é inválido."
            });
        }

        return errors;
    }

}

module.exports = new AdvertisementValidator();