require("dotenv").config();
const express = require("express");
const app = express();

const cors = require('cors');
let corsOption= {
    origin:'http://localhost:19006',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));


const router = require("./routes/routes");

const connectToMongoDB = require("./database/config");

app.use(express.json());

connectToMongoDB();



app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});