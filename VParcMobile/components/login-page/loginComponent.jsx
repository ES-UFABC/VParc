import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button } from "react-native-paper";
import { withTheme } from "react-native-paper";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { 
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic 
} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import styles from '../../styles/styleLoginPage';
import colors from "../../styles/colors";


const InputFieldLogin = (props) =>{
  return (
    <TextInput 
      {...props}
      outlineColor={colors.tertiary}
      activeOutlineColor='#ffffff'
      mode='flat'
      style={styles.inputText}
      underlineColor={colors.tertiary}  
      activeUnderlineColor={colors.tertiary} 
      left={<TextInput.Icon name='signature'/>}
    />
);
}


const LoginComponent = ({navigation}) =>{
    let [fontsloaded] = useFonts({
      Nunito_200ExtraLight,
      Nunito_200ExtraLight_Italic,
      Nunito_300Light,
      Nunito_800ExtraBold
    })
    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text style={
                styles.titulo
                }>VParc
            </Text>
                <View style={styles.inputView}> 
                    <InputFieldLogin
                      keyboardType="numeric"
                      placeholder="RA"
                    />
                </View>  
              
                <View style={styles.inputView}> 
                    <InputFieldLogin
                      placeholder='Senha'
                    />
                </View>  

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:17, fontFamily:'Nunito_800ExtraBold'}}>LOGIN</Text>
            </TouchableOpacity>
            
              <Button
                mode='contained'
                style={styles.forgot_btn}
                color='white'
                onPress={()=>console.log("ap")}
              >
                <Text style={styles.forgot_txt}>Esqueci a senha</Text>
              </Button>

        </View>
    );
}

export default LoginComponent;

