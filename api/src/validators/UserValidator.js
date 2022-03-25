const validator = require("validator");

const UserRepository = require("../repositories/UserRepository");

class UserValidator {

    async #validateEmail(email, errors) {
        if ( !email || !validator.isEmail(String(email)) || !String(email).endsWith("@aluno.ufabc.edu.br") ) {
            errors.push({
                field: "email",
                error: "E-mail inválido."
            });
            return false;
        }
        return true;
    }
    
    async #validatePassword(password, errors) {
        if ( !password || String(password).length < 6 ) {
            errors.push({
                field: "password",
                error: "Senha inválida."
            });
            return false;
        }
        return true;
    }

    async validateLogin(data) {
        const { email, password } = data;
        var errors = [];
    
        this.#validateEmail(email, errors);
        this.#validatePassword(password, errors);
    
        return errors;
    }

    async validateNew(user) {
        const { first_name, last_name, email, password, ra, cellphone } = user; 
        var errors = [];

        var validRA = true;
        var validEmail = true;

        if ( !first_name || validator.isEmpty(String(first_name), { ignore_whitespace: true }) ) {
            errors.push({
                field: "first_name",
                error: "O campo não pode ser vazio."
            });
        }
        if ( !last_name || validator.isEmpty(String(last_name), { ignore_whitespace: true }) ) {
            errors.push({
                field: "last_name",
                error: "O campo não pode ser vazio."
            });
        }

        validEmail = await this.#validateEmail(email, errors);
        await this.#validatePassword(password, errors);

        if ( !ra || String(ra).length < 8 || isNaN(ra) || validator.contains(String(ra), ".") ) {
            errors.push({
                field: "ra",
                error: "RA inválido."
            });
            validRA = false;
        }
        if ( !cellphone || String(cellphone).length < 11 || isNaN(String(cellphone)) || validator.contains(String(cellphone), ".") ) {
            errors.push({
                field: "cellphone",
                error: "Celular inválido."
            });
        }

        if (validEmail) {
            var res = await UserRepository.findByEmail(email);
            if (res.status == true) {
                errors.push({
                    field: "email",
                    error: "E-mail já cadastrado."
                })
            }
        }
        
        if (validRA) {
            var res = await UserRepository.findByRA(ra);
            if (res.status == true) {
                errors.push({
                    field: "ra",
                    error: "RA já cadastrado."
                })
            }
        }
        
        return errors;
    }

}

module.exports = new UserValidator();