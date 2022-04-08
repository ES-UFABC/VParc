import React, { useContext, useEffect, useState } from "react";
import {login, register} from '../services/userService';

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user,setUser] = useState({});
  const [signed, setSigned] = useState(false);

  async function signIn(email, senha) {
    if(!signed){
      await login(email, senha).then(
        (response)=>{
          if(response.status === true){
            setSigned(true);
            setUser(response.data.user);
          }
          return response;
        }
      ); 
    }
  }
  
  async function logout(){
    if(signed){
      setSigned(false);
    }
  }

  async function signUp(user){
    let response = await register(user)
    return response;
  }
  
  return (
    <AuthContext.Provider value={{ signed: signed, user: user, signIn, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export  {AuthProvider, useAuth}; 
