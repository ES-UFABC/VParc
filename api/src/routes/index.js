const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/UserController");
const CategoryController = require("../controllers/CategoryController");
const AdvertisementController = require("../controllers/AdvertisementController");

// Middlewares
const Middlewares = require("../middlewares/Middlewares");

// Main Routes
router.get("/", Middlewares.loggedUser, async (req, res) => {
    res.send("Rota principal.");
});

// User Routes
router.post("/user", UserController.create);
router.get("/user/activate", UserController.activate);
router.post("/login", UserController.login);
router.delete("/user/:id", Middlewares.loggedUser, UserController.delete);

// Category Routes
router.get("/category", CategoryController.findAll);
router.get("/category/:id", CategoryController.findById);
router.post("/category/:newCategory", Middlewares.admin, CategoryController.create);
router.delete("/category/:id", Middlewares.admin, CategoryController.delete);

// Advertisement Routes
router.get("/advertisement", Middlewares.loggedUser, AdvertisementController.findAll);
router.get("/advertisement/:id", Middlewares.loggedUser, AdvertisementController.findById);
router.post("/advertisement", Middlewares.loggedUser, AdvertisementController.create);
router.delete("/advertisement/:id", Middlewares.loggedUser, AdvertisementController.delete);
router.put("/advertisement/:id", Middlewares.loggedUser, AdvertisementController.update);
router.post("/advertisement/image", Middlewares.loggedUser, Middlewares.imageUpload, AdvertisementController.uploadImage);

module.exports = router;