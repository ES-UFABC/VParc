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

const createAdvertisement = async (advertisement) =>{
    let response = [{}];
    axios.post(BASE_URL + '/advertisement', advertisement)
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
    return response
}

const deleteAdvertisement = async (advertisement) =>{
    let response = {};
    let id = advertisement._id
    await axios.delete(BASE_URL + '/advertisement/' + id)
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
    return response;
}

const updateAdvertisement = async (advertisement)=>{
    let response = {};
    let id = advertisement._id;
    await axios.put(BASE_URL + '/advertisement/' + id, advertisement)
        .then(
            (responseApi)=>{
                response=responseApi;
            }
        )
        .catch(
            (error)=>{
                response = error.response.data;
            }
        )
    console.log(response);
    return response;
}

export {getAll, deleteAdvertisement, updateAdvertisement, createAdvertisement};
