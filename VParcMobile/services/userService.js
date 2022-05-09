import axios from 'axios';

const login = async (email, senha)  => {
    let response;
    let loginObj = {email:email, password:senha};
    await axios.post(process.env.BASE_URL + '/login', loginObj)
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
    
    await axios.post(process.env.BASE_URL + '/user',user)
                .then((responseAPI) => response = responseAPI.data)
                .catch((error) => response =  error.response.data);
    return response;
}

const deleteUser = async(user) =>{
    let response;

    await axios.delete(process.env.BASE_URL + '/user',user)
                .then((responseAPI) => response = responseAPI.data)
                .catch((error) => response = error.response.data);
}

const updateUser = async(user) =>{
    let response;
    await axios.put(process.env.BASE_URL + '/user/' + user._id, user)
                .then((res)=>{
                    response = res;
                })
                .catch(error => {
                    response = error;
                });
    return response;
}

export  {login, register, deleteUser, updateUser};
