require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async function() {

    mongoose.Promise = global.Promise;
    mongoose.connect( process.env.MONGO_URI ).then(() => {
        console.log("Conectado ao MongoDB!");
    }).catch(err => {
        console.log("Erro ao se conectar ao MongoDB: " + err);
    });

};