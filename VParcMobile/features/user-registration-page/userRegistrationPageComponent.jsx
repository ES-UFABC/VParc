import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Nunito_300Light, Nunito_400Regular, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import styles from "../../styles/styleUserRegistrationPage";
import colors from "../../styles/colors";
import InputFieldRegistration from "../../components/inputFieldRegistration";
import MenuButtonComponent from "../../components/menuButtonComponent";
import { useAuth } from "../../context/userAuth";
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import AppLoading from 'expo-app-loading';
const UserRegistrationComponent = ({navigation}) => {
    const {signUp} = useAuth();

    const [barVisible, setBarVisible] = useState(false);
    const [snackBarText,setSnackText] = useState('');
    const onDismissSnackBar = () => setBarVisible(false);

    const [isRegistering, setRegistering] = useState(false);
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRA, setUserRA] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const handleRegister = async () =>{
        setRegistering(true);
        let registerObj={
            first_name:userName,
            last_name:userLastName,
            email:userEmail,
            ra:userRA,
            cellphone:userPhone,
            password:userPassword
        }
        await signUp(registerObj).then((response)=>{
                setBarVisible(true);
                setSnackText(response.message);
                if(response.status === true){
                    setTimeout(()=>navigation.pop(),2000);
                }else{
                    setRegistering(false);
                }

            }
        )

    }

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
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ScrollView style = { styles.container }>
            {!isRegistering ? 
                (<>
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
                        onPress = { () => handleRegister() }
                        />
                    </View>
                </>):
                    (<ActivityIndicator size='large' animating={true} color={colors.primary} />)
            }

                <Snackbar visible={barVisible} 
                        onDismiss={onDismissSnackBar} 
                        action={{label:'OK',onPress:()=>onDismissSnackBar}}
                >
                <Text>{snackBarText}</Text>
                </Snackbar>
            
        </ScrollView>
    );
}

export default UserRegistrationComponent;