import React, { useState } from "react";
import { useAuth } from "../../context/userAuth";
import styles from "../../styles/styleAdvertisementPage";
import { Appbar, List, ActivityIndicator, Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { getAdFromUser } from "../../services/advertisementService";
import colors from "../../styles/colors";
import AppLoading from 'expo-app-loading';

import { useFonts } from "@expo-google-fonts/nunito";
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_800ExtraBold,
  } from '@expo-google-fonts/nunito'
const UserProfileComponent = ({navigation}) =>{
    const {user} = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [loadAds, setLoadAds] = useState(false);
    const [advertisementList, setAdvertisementList] = useState([]);
    
    const handlePress = async () => {
        setExpanded(!expanded);
    };

    let [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_800ExtraBold
      });
    if (!fontsLoaded) {
        return <AppLoading />;
    }


    const loadAdsFromUser =  async () =>{
        console.log("entrou pra carregar 2");
        await getAdFromUser(user.id).then(
            (ads)=>{
                setAdvertisementList(ads);
                setLoadAds(true);
            }
        )
    }

    if(!loadAds){
        loadAdsFromUser();
    }
    const showAdPage = (ad) =>{
        navigation.push('AdvertisementPage', ad);
    }
    return(
        <View>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='arrow-left' style={{flex:1, alignItems:'left'}} onPress={()=>navigation.pop()}/>
                <Text style={styles.appBarTitleItem}>Meu Perfil</Text>
            </Appbar.Header>
            <View style={styleUser.primeiraParte}>
                <View style={styleUser.drawImg}>
                </View>
                <View style={styleUser.userData}>
                    <Text style={styleUser.userData}>Nome: {user.first_name} {user.last_name}</Text>
                    <Text style={styleUser.userData}>Email: {user.email}</Text>
                    <Text style={styleUser.userData}>RA: {user.ra}</Text>
                    <Text style={styleUser.userData}>Celular: {user.cellphone}</Text>
                </View>
            </View>
            <View style={styleUser.oldAdSection}>
                <List.Section title="">
                    <List.Accordion
                        title="Seus anúncios"
                        titleStyle={{fontFamily:'Nunito_800ExtraBold'}}
                        expanded={expanded}
                        onPress={() => handlePress()}
                        style={{backgroundColor:colors.primary}}
                    >
                        {!loadAds ? 
                            <ActivityIndicator style={{margin:'20px'}}/>:
                            advertisementList.map(
                                (ads, index)=>{
                                    return(
                                        <List.Item 
                                            key={index} 
                                            style={{backgroundColor:colors.secundary}} 
                                            title={ads.title} 
                                            titleStyle={{fontFamily:'Nunito_800ExtraBold'}} 
                                            descriptionStyle={{fontFamily:'Nunito_800ExtraBold'}} 
                                            description={"R$ "+ads.price}
                                            onPress={()=>showAdPage(ads)}
                                        />
                                    )
                                }
                            )
                        }
                    </List.Accordion>
                </List.Section>
            </View>
        </View>
    );
}

export default UserProfileComponent;

const styleUser = StyleSheet.create({
    primeiraParte:{
        flexDirection:'column'
    },
    drawImg:{
        backgroundColor:colors.grayMedium,
        width:'300px',
        height:'160px',
        margin:'40px',
    },
    userData:{
        flexDirection:'column',
        margin:'5px',
        fontFamily:'Nunito_800ExtraBold',
    },
    oldAdSection:{

    }
})