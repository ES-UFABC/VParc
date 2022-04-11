require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer");

function checkFileType(file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload a valid image file"));
    }

    cb(null, true);
}

const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + " - " + file.originalname);
    }
});

const upload = multer({
    storage: diskStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});
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
        console.log(authToken);
        jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {

            if (err) {
                res.status(400); // bad request
                res.json({
                    status: false,
                    message: "Não foi possível autenticar o token."
                });
                return;
            }

            req.userId = decoded.userId;
            req.admin = decoded.admin;
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

            req.userId = decoded.userId;
            req.admin = decoded.admin;
            next();

        });

    }

    async imageUpload(req, res, next) {
        upload.single("image")(req, res, async (err) => {

            if (err) {
                res.status(400); // bad request
                res.json({
                    status: false,
                    message: "Envie uma imagem válida."
                });
                return;
            }

            next();

        });
    }

}

module.exports = new Middlewares();