import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button,ActivityIndicator, Snackbar } from "react-native-paper";
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
import logar from '../../services/userService';
import logo from '../../assets/images/logoBranco.png';

const LoginComponent = ({navigation}) =>{
    
    const [isLogin,setLogin] = useState(false);
    const [email,setEmail] = useState('teste1@email.com');
    const [senha,setSenha] = useState('teste1234');
    const [barVisible, setBarVisible] = useState(false);
    const [snackBarText,setSnackText] = useState('');

    let response={};
    const updateEmail = (email) =>{
      setEmail(email);
    }

    const updateSenha = (senha) =>{
      setSenha(senha);
    }

    const onDismissSnackBar = () => setBarVisible(false);

    const login = async () =>{
      setLogin(true);
      response = await logar(email, senha);
      setSnackText(response.message);
      setBarVisible(true);
      if(response.message === 'Sucesso'){
        navigation.push('ListPage');
      }
      setLogin(false);
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
              <View style={{width:'100%', height:'80%',alignItems:'center'}}>
                
                <View styles={{alignItems:'center'}}>
                  <Text style={styles.titulo}>VParc</Text>
                  <Image source={logo} style={{width:180, height:180}}/>
                </View>

                <View style={{marginTop:'20%', width:'100%', alignItems:'center'}}>
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
                </View>
                <View style={{width:'100%', alignItems:'center', marginTop:'20%'}}>                  
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
              </View>
             ): 
             (
              <ActivityIndicator size='large' animating={true} color={colors.white} />
             )
            }
            <Snackbar visible={barVisible} 
                      onDismiss={onDismissSnackBar} 
                      action={{label:'OK',onPress:()=>onDismissSnackBar}}
            >
              <Text>{snackBarText}</Text>
            </Snackbar>
        </View>
    );
}

export default LoginComponent;

