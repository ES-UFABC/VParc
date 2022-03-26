import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListPageComponent from '../features/list-page/listPageComponent';


const Stack = createStackNavigator();

const AppRoutes = () => {

    return(
        <Stack.Navigator>
            <Stack.Screen name="ListPage" component={ListPageComponent} options={{headerShown:null}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes;