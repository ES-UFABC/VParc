const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NAMES = require("../database/names");

const Notifications = new Schema({
    advertisementId: {
        type: String,
        required: true
    },
    advertisementTitle:{
        type: String,
        required: true
    },
    interestedId: {
        type: String,
        required: true
    },
    nameInterested:{
        type: String,
        required: true
    },
    numberInterested:{
        type: String,
        required: true
    },
    ownerAdId:{
        type:String,
        required:true
    },
    dateNotified:{
        type:Date
    },
    read:{
        type:Boolean
    }
});

mongoose.model(NAMES.NOTIFICATIONS, Notifications);

module.exports = mongoose.model(NAMES.NOTIFICATIONS);
