
import { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import LoginComponent from './components/land-page/loginComponent';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

export const theme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:"#657fac", //logo
    secundary:'#8da4cd', //fundo
    tertiary:"#839bc4", //input
  }
}




const App = () => {
  const [nome,setNome] = useState("João");
  
  return (
    <PaperProvider >
      <View style={styles.container}>
        <LoginComponent/>
      </View>
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
