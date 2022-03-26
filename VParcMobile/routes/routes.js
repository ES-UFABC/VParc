import React from "react";
import { useAuth } from "../context/userAuth";
import AppRoutes from "./appRoute";
import AuthRoutes from "./authRoute";


const Routes = () => {
    const {signed} = useAuth(); 
    return signed ? <AppRoutes /> : <AuthRoutes />
    
}

export default Routes;