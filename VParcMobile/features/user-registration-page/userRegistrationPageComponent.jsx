import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
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
import styles from "../../styles/styleUserRegistrationPage";
import colors from "../../styles/colors";
import InputFieldRegistration from "../../components/inputFieldRegistration";
import MenuButtonComponent from "../../components/menuButtonComponent";

const UserRegistrationComponent = ({navigation}) => {

    const [isRegistering, setRegistering] = useState(false);
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRA, setUserRA] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const updateUserName = (name) => {
        setUserName(name);
    }

    const updateUserLastName = (lastName) => {
        setUserLastName(lastName);
    }

    const updateUserEmail = (email) => {
        setUserEmail(email);
    }

    const updateUserRA = (ra) => {
        setUserRA(ra);
    }

    const updateUserPassword = (password) => {
        setUserPassword(password);
    }

    const updateUserPhone = (phone) => {
        setUserPhone(phone);
    }

    const updateRegistering = () => {
        setRegistering(true);
        setTimeout(() => setRegistering(false), 4000);
    }

    let [fontsLoaded] = useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_800ExtraBold,
    });

    return (
        <ScrollView style = { styles.container }>
            <View style = { styles.textContainer }>
                <Text style = { styles.title }>
                    Vamos Cadastrar?
                </Text>
                <Text style = { styles.description }>
                    Tenha acesso a diversos livros universitários no preçinho
                </Text>
            </View>

            <View style = {styles.inputTextContainer}>
                <View style = { styles.inputView }>
                    <InputFieldRegistration 
                        value = {userName}
                        placeholder = "Nome"
                        onChangeText = { (name) => updateUserName(name) }
                    />
                </View>
                <View style = { styles.inputView }>
                    <InputFieldRegistration 
                        value = {userLastName}
                        placeholder = "Sobrenome"
                        onChangeText = { (lastName) => updateUserLastName(lastName) }
                    />
                </View>
                <View style = { styles.inputView }>
                    <InputFieldRegistration 
                        value = {userEmail}
                        placeholder = "E-mail Institucional"
                        onChangeText = { (email) => updateUserEmail(email) }
                    />
                </View>
                <View style = { styles.inputView }>
                    <InputFieldRegistration 
                        value = {userRA}
                        placeholder = "Registro Acadêmico (RA)"
                        onChangeText = { (ra) => updateUserRA(ra) }
                        keyboardType = "numeric"
                    />
                </View>
                <View style = { styles.inputView }>
                    <InputFieldRegistration 
                        value = {userPhone}
                        placeholder = "Celular"
                        onChangeText = { (phone) => updateUserPhone(phone) }
                        keyboardType = "numeric"
                    />
                </View>
                <View style = { styles.inputView }>
                    <InputFieldRegistration 
                        value = {userPassword}
                        placeholder = "Senha"
                        onChangeText = { (password) => updateUserPassword(password) }
                        secureTextEntry = {true}
                    />
                </View>

                <MenuButtonComponent
                titulo = "Criar conta"
                cor = { colors.tertiary }
                onPress = { () => {} }
                />
            </View>
        </ScrollView>
    );
}

export default UserRegistrationComponent;