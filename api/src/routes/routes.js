const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controller/UserController");

// Main Routes
router.get("/", async (req, res) => {
    res.send("Rota principal.");
});

// User Routes
router.post("/user", UserController.create);

module.exports = router;