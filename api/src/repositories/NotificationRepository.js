const Notification = require("../models/Notifications");

function newErrorMessage(message, error) {
    return {
        status: false,
        message,
        error
    }
}
class NotificationsRepository{
    async create(notification){
        const {advertisementId, advertisementTitle, interestedId, nameInterested, numberInterested, ownerAdId, dateNotified, read} = notification;

        const newNotification = new Notification({
            advertisementId,
            advertisementTitle,
            interestedId,
            nameInterested,
            numberInterested,
            ownerAdId,
            dateNotified,
            read
        });
        try{
            const result = newNotification.save();
            return{
                status:true,
                message:"SUCCESS",
                data:{
                    result
                }
            };
        }catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);

        }
    }

    async findByUserId(userId) {
        try {
            const result = await Notification.find().sort({dateNotified:-1, read:1}).where({
                ownerAdId: userId
            }).lean();
                return {
                    status: true,
                    data: {
                        length: result.length,
                        result
                    }
                }
            
        } catch (err) {

            console.log(err);
            return newErrorMessage("ERROR", err);
            
        }
    }

    async readNotification(id){
        try{
            const result = await Notification.updateOne(
                {_id: id},
                {read:true}
            )
            return {
                status: true,
                message: "SUCCESS"
            };
        }catch (err) {
            console.log(err);
            return newErrorMessage("ERROR", err);
        }
    }
}

module.exports = new NotificationsRepository();