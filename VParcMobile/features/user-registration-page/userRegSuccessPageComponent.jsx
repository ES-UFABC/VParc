import React, { useState, Component, useEffect } from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native";
import { Nunito_400Regular, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import styles from "../../styles/styleUserRegSuccessPage";
import colors from "../../styles/colors";
import { useAuth } from "../../context/userAuth";

const UserRegSuccessComponent = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
        Nunito_800ExtraBold
    });

    return(
        <View style = { styles.container }>
            <Text style = { styles.title }>
                E-mail de verificação enviado!
            </Text>
            <View style = { styles.spacerStyle }></View>
            <Text style = { styles.description }>
                Por favor, verifique seu e-mail institucional e siga as instruções para ter acesso à plataforma.
            </Text>
            <Text style = { styles.description }>
                Se não encontrar na sua caixa de entrada, procure também na sua caixa de spam.
            </Text>
        </View>
    );
}

export default UserRegSuccessComponent;