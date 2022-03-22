const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controller/UserController");

// Middlewares
const Middlewares = require("../middleware/Middlewares");

// Main Routes
router.get("/", Middlewares.loggedUser, async (req, res) => {
    res.send("Rota principal.");
});

// User Routes
router.post("/user", UserController.create);
router.post("/login", UserController.login);

module.exports = router;