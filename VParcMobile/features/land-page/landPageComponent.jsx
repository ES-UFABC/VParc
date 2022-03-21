import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styleLandPage";
import colors from "../../styles/colors";
import { Nunito_200ExtraLight, Nunito_200ExtraLight_Italic, Nunito_300Light, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import MenuButtonComponent from "../../components/menuButtonComponent";

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

