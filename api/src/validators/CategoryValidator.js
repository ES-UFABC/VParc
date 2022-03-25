const validator = require("validator");

const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryValidator {

    async validateNew(category) {
        var errors = [];

        if ( !category || validator.isEmpty(String(category), { ignore_whitespace: true }) ) {
            errors.push({
                field: "category",
                error: "O campo não pode ser vazio."
            });
        }

        return errors;
    }

    // receives an id and returns true if it's valid
    async validateId(categoryId) {
        
        if ( typeof categoryId !== "string" || categoryId.length !== 24 ){
            return false;
        }

        const result = await CategoryRepository.findById(categoryId);

        if (result.status == false) return false;

        return true;

    }

    // receives an array of ids and returns true if it's valid
    async validateIds(categoryIds) {

        if (Array.isArray(categoryIds) == false) return false;

        for (let i in categoryIds) {
            var element = categoryIds[i];

            const result = await this.validateId(element);

            if (result == false) return false;
        }

        return true;

    }

}

module.exports = new CategoryValidator();