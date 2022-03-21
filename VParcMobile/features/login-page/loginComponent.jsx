import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button,ActivityIndicator } from "react-native-paper";
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
import InputFieldLogin from '../../components/inputFieldLogin';
import UserService from "../../services/userService";

const LoginComponent = ({navigation}) =>{
    
    const [isLogin,setLogin] = useState(false);
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');

    const updateEmail = (email) =>{
      setEmail(email);
    }

    const updateSenha = (senha) =>{
      setSenha(senha);
    }

    const login = () =>{
      setLogin(true);
      console.log(email + ' ' + senha);
      setTimeout(()=>setLogin(false),4000); 
    }

    let [fontsloaded] = useFonts({
      Nunito_200ExtraLight,
      Nunito_200ExtraLight_Italic,
      Nunito_300Light,
      Nunito_800ExtraBold
    });

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            {!isLogin ? (
              <View style={{width:'100%', alignItems:'center'}}>
            <Text style={
                styles.titulo
                }>VParc
            </Text>
            
                <View style={styles.inputView}> 
                    <InputFieldLogin
                      value={email}
                      placeholder="Email"
                      onChangeText={(email)=>updateEmail(email)}
                    />
                </View>  
              
                <View style={styles.inputView}> 
                    <InputFieldLogin
                      value={senha}
                      placeholder='Senha'
                      onChangeText={(senha)=>updateSenha(senha)}
                    />
                </View>  
                
                  <TouchableOpacity style={styles.loginBtn} onPress={()=>login()}>
                      <Text style={styles.loginTxt} >LOGIN</Text>
                  </TouchableOpacity>
                  
                  <Button
                    mode='contained'
                    style={styles.forgot_btn}
                    color='white'
                    onPress={()=>{}}
                  >
                    <Text style={styles.forgot_txt}>Esqueci a senha</Text>
                  </Button>
              </View>
             ): 
             (
              <ActivityIndicator size='large' animating={true} color={colors.white} />
             )
            }
            
        </View>
    );
}

export default LoginComponent;

