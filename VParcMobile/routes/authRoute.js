import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LandPageComponent from '../features/land-page/landPageComponent';
import LoginComponent from '../features/login-page/loginComponent';
import UserRegistrationComponent from '../features/user-registration-page/userRegistrationPageComponent';
const Stack = createStackNavigator();


const AuthRoutes = () => {

    return(
            <Stack.Navigator>
                <Stack.Screen name="LandPage" component={LandPageComponent} />
                <Stack.Screen name="Login" component={LoginComponent} />
                <Stack.Screen name="UserRegistration" component={UserRegistrationComponent} />
            </Stack.Navigator>
    )
}

export default AuthRoutes;