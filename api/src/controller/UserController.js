const crypto = require("crypto");
const validator = require("validator");

const UserRepository = require("../repository/UserRepository");

class UserController {

    // (POST) /user
    async create(req, res) {

        const data = req.body; // retrieve data from the body's request

        // validate the data
        const errors = await validateNewUser(data);

        if (errors.length > 0) {

            res.status(400);
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

        // hash the password
        const salt = generateSalt();
        const hash = generateHash(data.password, salt);

        // create the user
        const user = {
            first_name: data.first_name, 
            last_name: data.last_name, 
            email: data.email, 
            ra: data.ra, 
            cellphone: data.cellphone, 
            hash, 
            salt
        }

        const result = await UserRepository.create(user);

        if (result.status == true) {

            res.status(201); // created
            res.json({
                status: true,
                message: "Usuário criado com sucesso!"
            });

        } else {

            res.status(500); // internal server error
            res.json({
                status: false,
                message: "Ocorreu uma falha interna!"
            });

        }

    }

}

function generateSalt() {
    return crypto.randomBytes(16).toString("hex");
}

function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); 
}

async function validateNewUser(data) {

    const { first_name, last_name, email, password, ra, cellphone } = data; 
    var errors = [];
    var validRA = true;
    var validEmail = true;

    if ( first_name == null || first_name == undefined || validator.isEmpty(String(first_name), { ignore_whitespace: true }) ) {
        errors.push({
            field: "first_name",
            error: "O campo não pode ser vazio."
        });
    }
    if ( last_name == null || last_name == undefined || validator.isEmpty(String(last_name), { ignore_whitespace: true }) ) {
        errors.push({
            field: "last_name",
            error: "O campo não pode ser vazio."
        });
    }
    if ( email == null || email == undefined || !validator.isEmail(String(email)) || !String(email).endsWith("@aluno.ufabc.edu.br") ) {
        errors.push({
            field: "email",
            error: "E-mail inválido."
        });
        validEmail = false;
    }
    if ( password == null || password == undefined || String(password).length < 6 ) {
        errors.push({
            field: "password",
            error: "Senha inválida."
        });
    }
    if ( ra == null || ra == undefined || String(ra).length < 8 || isNaN(ra) || validator.contains(String(ra), ".") ) {
        errors.push({
            field: "ra",
            error: "RA inválido."
        });
        validRA = false;
    }
    if ( cellphone == null || cellphone == undefined || String(cellphone).length < 11 || isNaN(String(cellphone)) || validator.contains(String(cellphone), ".") ) {
        errors.push({
            field: "cellphone",
            error: "Celular inválido."
        });
    }

    if ( validEmail ) {
        var res = await UserRepository.findByEmail(email);
        if (res.status == true) {
            errors.push({
                field: "email",
                error: "E-mail já cadastrado."
            })
        }
    }
    
    if ( validRA ) {
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

module.exports = new UserController();