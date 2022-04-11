import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListPageComponent from '../features/list-page/listPageComponent';
import CreateAdvertisementComponent from '../features/create-advertisement/create-advertisement';
import AdvertisementPageComponent from '../features/advertisement-page/advertisementPage';
import UserProfileComponent from '../features/user-profile-page/userProfilePageComponent';
const Stack = createStackNavigator();

const AppRoutes = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="ListPage" component={ListPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="CreateAdvertisement" component={CreateAdvertisementComponent}/>
            <Stack.Screen name="AdvertisementPage" component={AdvertisementPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="UserProfile" component={UserProfileComponent} options={{headerShown:null}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;