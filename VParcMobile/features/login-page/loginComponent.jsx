import { TouchableOpacity,  Text, View, Image } from "react-native";
import React, {  useState } from "react";
import { StatusBar } from "expo-status-bar";
import {  Button,ActivityIndicator, Snackbar } from "react-native-paper";
import { 
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import styles from '../../styles/styleLoginPage';
import colors from "../../styles/colors";
import InputFieldLogin from '../../components/inputFieldLogin';
import logo from '../../assets/images/logoBranco.png';
import {useAuth} from "../../context/userAuth";
import AppLoading from 'expo-app-loading';

const LoginComponent = ({navigation}) =>{
    const { signIn } = useAuth();
    const [isLogin,setLogin] = useState(false);
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [barVisible, setBarVisible] = useState(false);
    const [snackBarText,setSnackText] = useState('');

    
    const updateEmail = (email) =>{
      setEmail(email);
    }

    const updateSenha = (senha) =>{
      setSenha(senha);
    }

    const onDismissSnackBar = () => setBarVisible(false);

    const handleLogin = async () =>{
      if(!isLogin){
        setLogin(true);
        await signIn(email, senha).then(
          (response)=>{
            if(response.status !== true){
              setLogin(false);
              setSnackText(response.message);
              setBarVisible(true);
            }
          }
        );
        
      }
    }

    

    let [fontsLoaded] = useFonts({
      Nunito_200ExtraLight,
      Nunito_200ExtraLight_Italic,
      Nunito_300Light,
      Nunito_800ExtraBold
    });
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            {!isLogin ? (
              <View style={{width:'100%', height:'100%',alignItems:'center'}}>
                
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
                        secureTextEntry = {true}
                        onChangeText={(senha)=>updateSenha(senha)}
                      />
                </View>  
                </View>
                <View style={{width:'100%', alignItems:'center', marginTop:'1%'}}>                  
                  <TouchableOpacity style={styles.loginBtn} onPress={()=>handleLogin()}>
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

