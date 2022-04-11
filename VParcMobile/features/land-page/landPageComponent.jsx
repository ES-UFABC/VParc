import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../../styles/styleLandPage";
import colors from "../../styles/colors";
import { Nunito_200ExtraLight, Nunito_200ExtraLight_Italic, Nunito_300Light, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import MenuButtonComponent from "../../components/menuButtonComponent";
import logo from '../../assets/images/logoMaior.png';
import AppLoading from 'expo-app-loading';
const LandPageComponent = ({navigation}) => {

    let [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_800ExtraBold
    })
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
            <View style={styles.container}>
                
                <View style={styles.tituloLogo}>
                    <Text style={styles.titulo}>VParc</Text>
                    <Image source={logo} style={{width:180, height:180}}/>
                </View>

                <MenuButtonComponent 
                    titulo="Criar conta"
                    cor={colors.primary}
                    onPress = {() => navigation.push('UserRegistration')}
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

