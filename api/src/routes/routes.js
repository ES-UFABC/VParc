const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controller/UserController");
const CategoryController = require("../controller/CategoryController");

// Middlewares
const Middlewares = require("../middleware/Middlewares");

// Main Routes
router.get("/", Middlewares.loggedUser, async (req, res) => {
    res.send("Rota principal.");
});

// User Routes
router.post("/user", UserController.create);
router.post("/login", UserController.login);

// Category Routes
router.get("/category", CategoryController.findAll);
router.get("/category/:id", CategoryController.findById);
router.post("/category/:newCategory", Middlewares.admin, CategoryController.create);
router.delete("/category/:id", Middlewares.admin, CategoryController.delete);

module.exports = router;