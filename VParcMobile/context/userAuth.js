import React, { useState } from "react";

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {

    const [user,setUser] = useState({});

    async function signIn() {
      const response = await auth.signIn();
      console.log(response);
    }
  
    return (
      <AuthContext.Provider value={{ signed: false, user: {}, signIn }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider;