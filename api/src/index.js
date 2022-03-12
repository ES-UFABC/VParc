require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/routes");

const connectToMongoDB = require("./database/config");

app.use(express.json());

connectToMongoDB();

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});