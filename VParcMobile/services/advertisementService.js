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
    await axios.post(BASE_URL + '/advertisement', advertisement)
        .then(
            (responseApi)=>{
                response = responseApi.data;
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

const getAdFromUser = async(id) => {
    let adsFromUser = [];
    await getAll().then(
        (advertisements)=>{
            advertisements.map(
                (ad)=>{
                    if(ad.userId === id){
                        adsFromUser.push(ad);
                    }
                }
            )
        }
    )
    return adsFromUser;
}
const dataUrlToFile = async (dataUrl, fileName) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob;
}

const convertToFile = async(dataUri, id) =>{
    let filename = dataUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? 'image/${match[1]}':'image';
    let formData = new FormData();
    formData.append('image', {uri:dataUri, name:filename, type:type});
    return formData;
}

const uploadImage = async(id, image)=>{
    //const file = await dataUrlToFile(image, id);
    //console.log(file);
    //const imageBody = new FormData();
    //imageBody.append('image', file);
    console.log(id);
    const reqBody = await convertToFile(image, id);
    console.log(reqBody);
    const imgBody = {img:image}
    axios.post(BASE_URL + '/advertisement/image?id='+id,imgBody,{
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err.response);
    });

}

export {getAll, deleteAdvertisement, updateAdvertisement, createAdvertisement, getAdFromUser, uploadImage};
