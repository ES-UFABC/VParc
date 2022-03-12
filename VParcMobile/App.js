
import { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import LoginComponent from './components/land-page/loginComponent';

const App = () => {
  const [nome,setNome] = useState("João");
  
  return (
    <View style={styles.container}>
      
      <LoginComponent/>
    </View>
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
