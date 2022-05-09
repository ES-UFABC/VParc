import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoggedLandPageComponent from '../features/logged-land-page/loggedLandPageComponent';
import DonationListPageComponent from '../features/donation-list-page/donationListPageComponent';
import SellListPageComponent from '../features/sell-list-page/sellListPageComponent';
import CreateAdvertisementComponent from '../features/create-advertisement/create-advertisement';
import AdvertisementPageComponent from '../features/advertisement-page/advertisementPage';
import UserProfileComponent from '../features/user-profile-page/userProfilePageComponent';
const Stack = createStackNavigator();

const AppRoutes = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="LoggedLandPage" component={LoggedLandPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="SellListPage" component={SellListPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="DonationListPage" component={DonationListPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="CreateAdvertisement" component={CreateAdvertisementComponent}/>
            <Stack.Screen name="AdvertisementPage" component={AdvertisementPageComponent} options={{headerShown:null}}/>
            <Stack.Screen name="UserProfile" component={UserProfileComponent} options={{headerShown:null}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;