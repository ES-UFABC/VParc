import users from "../mock/userMock";
import axios from 'axios';
const BASE_URL = 'http://192.168.15.13:3000/api';

const login = async (email, senha)  => {
    let response;
    let loginObj = {email:email, password:senha};
   
    await axios.post(BASE_URL + '/login', loginObj)
    .then(responseAPI => {
        response = responseAPI.data;
        axios.defaults.headers.common['authorization'] = response.data.token;
    })
    .catch(error=>{
            response = error.response.data;
        });
    return response
}

const register =  async (user) =>{
    let response;
    
    await axios.post(BASE_URL + '/user',user)
                .then((responseAPI) => response = responseAPI.data)
                .catch((error) => response =  error.response.data);
    return response;
}



export  {login, register};
