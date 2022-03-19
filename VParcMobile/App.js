
import { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import LoginComponent from './components/login-page/loginComponent';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LandPageComponent from './components/land-page/landPageComponent';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:"#657fac", //logo
    secundary:'#8da4cd', //fundo
    tertiary:"#839bc4", //input
  }
}

const Stack = createNativeStackNavigator();


const App = () => {
  
  return (
    <PaperProvider >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandPage">
        
            <Stack.Screen name="LandPage" component={LandPageComponent} />
            <Stack.Screen name="Login" component={LoginComponent} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
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
