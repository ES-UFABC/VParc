
import api from "./api";

const UserService = () =>{
    login = (email, senha)  => {
        // api.post("/user",{email:email, senha:senha})
        //     .then((response) => response)
        //     .catch((error) => error);
        console.log('chegou');
    }

    cadastrar = (email, senha) =>{
        api.post("user/register",{email:email, senha:senha})
            .then((response) => response)
            .catch((error) => error);
    }

}

export default UserService;