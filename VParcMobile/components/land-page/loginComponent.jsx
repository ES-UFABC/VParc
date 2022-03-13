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

const colors = {
  primary:"#657fac", //logo
    secundary:'#8da4cd', //fundo
    tertiary:"#839bc4", //input
}

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


const LoginComponent = () =>{
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


const styles = StyleSheet.create({

    titulo:{
      marginBottom:100,
      color:'white',
      fontWeight:'bold',
      fontSize:30,
      fontFamily:'Nunito_800ExtraBold'
    },
    container: {
      flex:1,
      backgroundColor: colors.secundary,
      alignItems: "center",
      justifyContent: "center",
      alignSelf:'stretch',
      flexDirection:'column'
    },
    inputView: {
      backgroundColor: colors.tertiary,
      borderRadius: 30,
      height: 50,
      marginBottom: 20,
      width: "80%",
      alignItems: "center",
      borderWidth:2,
      borderColor:'white'
    },
    inputText: {
      height: 45,
      colo:'black',
      textAlign:"center",
      paddingRight:20,
      placeholderTextColor:'white',
      backgroundColor:colors.tertiary,
      width:'90%',
      borderColor:colors.tertiary,
      placeholderTextColor:'white',
      fontFamily:'Nunito_800ExtraBold',
    },
    forgot_btn:{
      marginTop:20,
    },
    forgot_txt:{
      fontWeight:'bold', 
      fontSize:12, 
      fontFamily:'Nunito_800ExtraBold'
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      marginTop: 40,
      backgroundColor: colors.primary,
      justifyContent:'center'
    },
  });
