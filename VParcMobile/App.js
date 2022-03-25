
import { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LandPageComponent from './features/land-page/landPageComponent';
import LoginComponent from './features/login-page/loginComponent';
import UserRegistrationComponent from './features/user-registration-page/userRegistrationPageComponent';
import ListPageComponent from './features/list-page/listPageComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider from './context/userAuth';
import User from './models/user';



const Stack = createNativeStackNavigator();


const App = () => {

  const [isAuth,setAuth] = useState(false);
  

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandPage">

                <Stack.Screen name="LandPage" component={LandPageComponent} />
                <Stack.Screen name="Login" component={LoginComponent} />
                <Stack.Screen name="UserRegistration" component={UserRegistrationComponent} />
                <Stack.Screen name="ListPage" component={ListPageComponent} options={{headerShown:null}}/>
            
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundInput:{
    borderWidth:1,
    height:40,
    margin:12,
    padding:10,
  }
});
