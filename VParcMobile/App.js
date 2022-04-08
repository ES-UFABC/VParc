
import { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from './context/userAuth';
import Routes from './routes/routes';


const App = () => {

  const [isAuth,setAuth] = useState(false);
  

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Routes />
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
