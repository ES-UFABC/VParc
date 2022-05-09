import React, { useEffect, useState, Component } from "react";
import { View, Text,ScrollView, TouchableOpacity } from "react-native";
import { Appbar,  Card,  Paragraph, Button, FAB,  Menu, ActivityIndicator } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleLoggedLandPage";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito';
import { useAuth } from "../../context/userAuth";
import AppLoading from 'expo-app-loading';
import { getAll } from "../../services/advertisementService";
import AnuncioCardComponent from "../../components/anuncioCardComponent";
import LandPageButtonComponent from "../../components/landPageButton";

const LoggedLandPageComponent = ({navigation}) => {
    
    const { logout } = useAuth();
    const [originalAdList, setOriginalAdList] = useState([]);
    const [advertisementList, setAdList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [optionsVisible, setOptions] = useState(false);
    const [isLoadinAd, setIsLoadingAd] = useState(false);

    useEffect(()=>{ 
        if(!loaded){
            loadAds();
        } 
         
    },[originalAdList]);
    const handleLogout = async ()=> { await logout();}
    const viewProfile = () => {navigation.push('UserProfile')}
    const loadAds = async() =>{
        setIsLoadingAd(true);
        await getAll().then(
            (ads)=>{
                setOriginalAdList(ads.reverse());
                let arrayAd = [];
                ads.slice(0, 5).map (
                    (ad)=>{
                        arrayAd.push(ad);
                    }
                )
                setAdList(arrayAd); 
            }
        ).finally(()=>{setLoaded(true);setIsLoadingAd(false);
        })
    
    }

    const openOption = () =>{
        setOptions(true);
    }
    const closeOption = () =>{
        setOptions(false);
    }

    const showAnnouncement = () => {
        return (
            <View>
                <Text style={ styles.tituloTag }> Anúncios criados recentemente </Text>
                <View style={ styles.spacerStyle }></View>
                {advertisementList.map((advertisement, index)=>{
                return(
                    <AnuncioCardComponent key={index} advertisement={advertisement} navigation={navigation}/>
                )
                })}
            </View>
        )
    }

    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
        Nunito_800ExtraBold
      });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return(
        <View>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='refresh' onPress={() => setLoaded(false)}/>
                <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='account'  onPress={()=>openOption()}/>}>
                    <Menu.Item onPress={()=>{handleLogout(); closeOption()}} title="Deslogar"/>
                    <Menu.Item onPress={()=>{viewProfile(); closeOption()}} title="Ver Perfil"/>
                    
                </Menu>
            </Appbar.Header>

            <View style={styles.spacerStyle}></View>
            <ScrollView>
                <Text style={ styles.tituloTag }> O que você deseja fazer? </Text>
                <View style={ styles.spacerStyle }></View>
                <LandPageButtonComponent
                        titulo = "Ver livros à venda"
                        cor = { colors.register }
                        onPress = { () => navigation.push("SellListPage") }
                />
                <View style={ {marginBottom:8} }></View>
                <LandPageButtonComponent
                        titulo = "Ver livros para doação"
                        cor = { colors.primary }
                        onPress = { () => navigation.push("DonationListPage") }
                />
                <View style={ styles.spacerStyle }></View>
                {isLoadinAd ? <ActivityIndicator style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            justifyContent: "center",
                                                            alignItems: "center",}
                                                        } 
                                                animating={true} color={colors.primary} />:
                        showAnnouncement()
                }
            </ScrollView>
            <View style={ styles.spacerStyle }></View>
        </View>
    )
}



export default LoggedLandPageComponent;