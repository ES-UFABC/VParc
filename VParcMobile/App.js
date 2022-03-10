import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import FirstComponent from './components/firstComponent';

const App = () => {
  const [nome,setNome] = useState("João");
  
  return (
    <View style={styles.container}>
      <Text>Open up iOS to start working on your app!</Text>
      <TextInput 
        style={styles.backgroundInput} 
        onChangeText={text => setNome(text)}
        autoComplete="off"  
      />
      <FirstComponent/>
      <Text>{nome}</Text>
      <StatusBar style="auto" />
      
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
