require("dotenv").config();

const crypto = require("crypto");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/UserRepository");
const UserValidator = require("../validators/UserValidator");
class UserController {

    // (POST) /user
    async create(req, res) {

        const data = req.body; // retrieve data from the body's request

        // validate the data
        const errors = await UserValidator.validateNew(data);

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

    // (POST) /login
    async login(req, res) {
        const data = req.body; // retrieve data from the body's request

        // validate the data
        const errors = await UserValidator.validateLogin(data);

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

        // check if the user exists
        const response = await UserRepository.findByEmail(data.email);

        if (response.status == false) {

            res.status(404); // not found
            res.json({
                status: false,
                message: "Usuário não existe no sistema."
            });
            return;

        }

        // check email + password
        const user = response.data.result[0];
        const hash = generateHash(data.password, user.salt);

        if (hash != user.hash) {

            res.status(400); // bad request
            res.json({
                status: false,
                message: "Combinação de e-mail e senha incorreta."
            });
            return;

        }

        // generating JWT token
        const token = await jwt.sign(
            { 
                userId: user._id,
                admin: user.type == "admin" ? true : false
            }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200); // ok
        res.json({
            status: true,
            message: "Logado com sucesso.",
            data: {
                token
            }
        });

    }

}

function generateSalt() {
    return crypto.randomBytes(16).toString("hex");
}

function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex"); 
}

module.exports = new UserController();