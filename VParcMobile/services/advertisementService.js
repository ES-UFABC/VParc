import axios from "axios";


const BASE_URL = 'http://localhost:3000/api';

const getAll = async () =>{
    let advertisements = [{}];
    await axios.get(BASE_URL + '/advertisement')
        .then(
            (response)=>{
                advertisements = response.data.data.result;
            }
        )
        .catch(
            (error)=>{
                advertisements = error.response.data
            }
        )
    return advertisements;
}

const createAdvertisement = (advertisement) =>{
    let response = {};
    axios.post(BASE_URL + '/advertisement')
        .then(
            (responseApi)=>{
                response = responseApi;
            }   
        )
        .catch(
            (error)=>{
                response = error.response.data;
            }
        )
}

export {getAll};