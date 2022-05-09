import axios from "axios";

const notifyInterest = async(notification)=>{
    let response ={};
    await axios.post(process.env.BASE_URL + '/user/createNotification', notification)
        .then(res =>{
            response = res;
        })
        .catch(err =>{
            console.log(err.response);
        });
    return response;
}

const getNotifications = async(user)=>{
    let response = {};
    await axios.post(process.env.BASE_URL + '/user/getNotifications', user)
        .then((res)=>{
            response = res.data.data.data.result;
        })
        .catch(err=>{
            console.log(err);
        });
    
    return response;
}

const readNotification = async(notification)=>{
    let response = {};
    await axios.post(process.env.BASE_URL + '/user/readNotification', notification)
        .then((res)=>{
            response = res;
        })
        .catch(err =>{
            console.log(err);
        })
    return response;
}

export {notifyInterest, getNotifications, readNotification};