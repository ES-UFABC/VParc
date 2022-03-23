require("dotenv").config();
const jwt = require("jsonwebtoken");

class Middlewares {

    async loggedUser(req, res, next) {

        const authToken = req.headers["authorization"];

        if (!authToken) {
            res.status(401); // unauthorized
            res.json({
                status: false,
                message: "Nenhum token foi fornecido."
            });
            return;
        }

        const token = authToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.status(400); // bad request
                res.json({
                    status: false,
                    message: "Não foi possível autenticar o token."
                });
                return;
            }

            req.userId = decoded.userId;
            next();

        });

    }

    async admin(req, res, next) {

        const authToken = req.headers["authorization"];

        if (!authToken) {
            res.status(401); // unauthorized
            res.json({
                status: false,
                message: "Nenhum token foi fornecido."
            });
            return;
        }

        const token = authToken.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.status(400); // bad request
                res.json({
                    status: false,
                    message: "Não foi possível autenticar o token."
                });
                return;
            }

            if (decoded.admin == false) {
                res.status(403); // forbidden
                res.json({
                    status: false,
                    message: "Acesso negado."
                });
                return;
            }

            req.admin = decoded.admin;
            next();

        });

    }

}

module.exports = new Middlewares();