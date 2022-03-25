
import api from "./api";
import users from "../mock/userMock";


   const logar = async (email, senha)  => {
        let response = {message:"Falhou"};
        await users.map((user)=>{
            if(user.email === email && user.senha === senha){
                return response = {message:"Sucesso"}
            }
        })
        return response;
    }

    const cadastrar = (email, senha) =>{
        api.post("user/register",{email:email, senha:senha})
            .then((response) => response)
            .catch((error) => error);
    }



export default logar;