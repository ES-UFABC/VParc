import axios from "axios";

const log = () =>{
    console.log(process.env.BASE_URL);
}

const notifyInterest = async(notification)=>{
    log();
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
    log();
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
    log();
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