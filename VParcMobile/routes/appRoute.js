import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListPageComponent from '../features/list-page/listPageComponent';
 import CreateAdvertisementComponent from '../features/create-advertisement/create-advertisement';

const Stack = createStackNavigator();

const AppRoutes = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="ListPage" component={ListPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="CreateAdvertisement" component={CreateAdvertisementComponent} options={{headerShown:null}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;