
import React, { useState } from "react";
import { Alert, Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import styles from '../../styles/styleLandPage';
import { NavigationContainer } from '@react-navigation/native';
import colors from "../../styles/colors";
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito'

 import { useFonts } from "@expo-google-fonts/nunito";

const MenuButtonComponent = (props) =>{
    return(
        <TouchableOpacity 
            style={{ 
                width: "80%",
                borderRadius: 25,
                height: 50,
                alignItems: "center",
                marginTop: 20,
                justifyContent:'center', 
                backgroundColor:props.cor
            }} 
            onPress={props.onPress}
        >
            <Text style={styles.textButton}>{props.titulo}</Text>
        </TouchableOpacity>
    );
}

const LandPageComponent = ({navigation}) => {
    let [fontsloaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_800ExtraBold
      })
   


    return (
            <View style={styles.container}>
                <Text style={styles.titulo}>VParc</Text>
                
                
                <MenuButtonComponent 
                    titulo="Criar conta"
                    cor={colors.primary}
                />
                <MenuButtonComponent 
                    titulo="Logar"
                    cor={colors.register}
                    onPress={()=>navigation.push('Login')}
                />
                
            </View>
    );
}

export default  LandPageComponent;

