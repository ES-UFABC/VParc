import { TextInput, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const  colors = {
    primary: '#14213D',
    secundary: '#E5E5E5',
    tert: '#37392E',
    quart: '#eb7c5a',
    logo:"#657fac",
    fundo:'#8da4cd',
    input:"#839bc4",
};


const LoginComponent = () =>{

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text style={styles.titulo}>VParc</Text>

              <View style={styles.inputView}>
                  <TextInput 
                      keyboardType="numeric"
                      style={styles.inputText}
                      placeholder="RA..."/>
              </View>
              
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Senha..."/>
            </View>

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={{color:'white', fontWeight:'bold', fontSize:17}}>LOGIN</Text>
            </TouchableOpacity>


        </View>
    );

    
}

export default LoginComponent;


const styles = StyleSheet.create({

    titulo:{
      marginBottom:100,
      color:'white',
      fontWeight:'bold',
      fontSize:30
    },
    container: {
      flex:1,
      backgroundColor: colors.fundo,
      alignItems: "center",
      justifyContent: "center",
      alignSelf:'stretch',
      flexDirection:'column'
    },
   
    image: {
      marginBottom: 40,
    },
   
    inputView: {
      backgroundColor: colors.input,
      borderRadius: 30,
      height: 45,
      marginBottom: 20,
      width: "70%",
      alignItems: "center",
    },
   
    inputText: {
      height: 50,
      colo:'black',
      textAlign:"left",
      placeholderTextColor:'white'
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
      marginRight:12,
      marginLeft:20,
      marginTop:30,
      alignItems:'center',
      justifyContent:'center',
      width:110
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      marginTop: 40,
      backgroundColor: colors.logo,
      justifyContent:'center'
    },
  });
