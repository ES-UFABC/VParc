require("dotenv").config();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const NotificationRepository = require("../repositories/NotificationRepository");
const UserRepository = require("../repositories/UserRepository");
const UserValidator = require("../validators/UserValidator");


const SignedURLService = require("../services/SignedURLService");
const SendEmailService = require("../services/SendEmailService");

async function sendActivationEmail(user) {

    const url = `/api/user/activate?userId=${user._id}`;
    const signedUrl = await SignedURLService.sign(url);

    const email = {
        to: user.email,
        from: "Veteranos Parceiros <contato.vparc@gmail.com>",
        subject: "Ativação de conta",
        html: `<h3>Olá ${user.first_name},<br><h4>Para ativar sua conta, clique no link abaixo:</h4> <a href="http://localhost:3000${signedUrl}"> ATIVAR CONTA </a>`
    }

    SendEmailService.send(email);

}
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

            sendActivationEmail(result.data.result);

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

        // check if the user is active
        if (response.data.result[0].active == false) {
            res.status(401); // unauthorized
            res.json({
                status: false,
                message: "Usuário não está ativo, verifique seu e-mail para ativação."
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
                user: {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    ra: user.ra,
                    cellphone: user.cellphone,
                    type: user.type,
                    active: user.active
                },
                token
            }
        });

    }

    // (POST) /createNotification
    async createNotification(req, res){
        const data = req.body;
        const response = NotificationRepository.create(data);
        if (response.status == false) {

            res.status(404); // not found
            res.json({
                status: false,
                message: "Erro ao criar notificação"
            });
            return;

        }else{
            res.status(201); // created
            res.json({
                status: true,
                message: "Usuário foi notificado"
            });
        }
    }

    async getNotifications(req, res){
        
        const data = req.body;
        const response = await NotificationRepository.findByUserId(data.id);
        if (response.status == false) {

            res.status(404); // not found
            res.json({
                status: false,
                message: "Erro ao criar notificação"
            });
            return;

        }else{
            res.status(201); // created
            res.json({
                status: true,
                data: response
            });
        }
    }

    async readNotification(req,res){
        const data = req.body;
        const response = await NotificationRepository.readNotification(data._id);
        if (response.status == false) {

            res.status(404); // not found
            res.json({
                status: false,
                message: "Erro ao criar notificação"
            });
            return;

        }else{
            res.status(201); // created
            res.json({
                status: true,
                message: "Notificação lida"
            });
        }
    }

    // (GET) /user/activate?userId= &hash
    async activate(req, res) {
        
        const url = req.originalUrl;
        const userId = req.query.userId;

        if (await SignedURLService.verify(url) == false) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "Link inválido!"
            });
            return;
        }

        // activate the user
        const user = {
            id: userId,
            active: true
        }
        const result = await UserRepository.update(user);

        if (result.status == true) {                
            res.status(200); // ok
            res.json({
                status: true,
                message: "Conta ativada com sucesso!"
            });
        } else {
            res.status(500); // internal server error
            res.json({
                status: false,
                message: "Ocorreu uma falha interna!"
            });
        } 

    }

    async update(req, res){
        const id = req.params.id;
        const data = req.body;
        if (!id) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "ID inválido!"
            });
            return;
        }

        const result = await UserRepository.update(data);

        if (result.status == false) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "Erro ao atualizar!"
            });
            return;
        }

        res.status(200); // ok
        res.json({
            status: true,
            message: "Usuário atualizado com sucesso!"
        });
    }

    async delete(req, res) {

        const id = req.params.id;

        if (!id) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "ID inválido!"
            });
            return;
        }

        if (req.userId != id && req.admin == false) {
            res.status(401); // unauthorized
            res.json({
                status: false,
                message: "Você não tem permissão para deletar este usuário!"
            });
            return;
        }

        const result = await UserRepository.deleteById(id);

        if (result.status == false) {
            res.status(400); // bad request
            res.json({
                status: false,
                message: "ID não existe!"
            });
            return;
        }

        res.status(200); // ok
        res.json({
            status: true,
            message: "Usuário deletado com sucesso!"
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