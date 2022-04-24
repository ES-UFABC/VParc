import React, { useEffect, useState } from "react";
import { View, Text,ScrollView, TouchableOpacity } from "react-native";
import { Appbar,  Searchbar, Drawer, Card, Title, Paragraph, Button, FAB, Portal, Menu } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito';
import { useAuth } from "../../context/userAuth";
import AppLoading from 'expo-app-loading';
import { getAll } from "../../services/advertisementService";

const AnuncioCardComponent = (props) =>{
    let anuncio = props.advertisement;
    let navigation = props.navigation;
    const showAdPage = () =>{
        navigation.push('AdvertisementPage', anuncio);
    }
    return(
        <Card style={{backgroundColor:colors.white, marginStart: '2%', marginEnd: '2%', marginTop: '2%'}}>
            <Card.Title title={anuncio.title} style={{ color: colors.white, backgroundColor: colors.secundary, marginBottom: '2%'}}/>
            <Card.Content>
                <Paragraph style={{ color:colors.black}}>R$ {anuncio.price} </Paragraph>  
            </Card.Content>
            <Card.Actions>
                <Button  onPress={()=>showAdPage()}>Ver detalhes</Button>
            </Card.Actions>
        </Card> 
    );
}

const ListPageComponent = ({navigation}) => {
    
    const { logout } = useAuth();
    const [originalAdList, setOriginalAdList] = useState([]);
    const [advertisementList, setAdList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [optionsVisible, setOptions] = useState(false);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [itensShowed, setItensShowed] = useState(10);
    const [searchBarValue, setSearchBarValue] = useState('');
    const handleLogout = async ()=> { await logout();}
    const viewProfile = () => {navigation.push('UserProfile')}
    const loadAds = async() =>{
        await getAll().then(
            (ads)=>{
                setOriginalAdList(ads.reverse());
                filterAdsQuantity(ads.length);
                setLoaded(true);
            }
        )
    
    }

    const openOption = () =>{
        setOptions(true);
    }
    const closeOption = () =>{
        setOptions(false);
    }

    const filterAdsQuantity = (adsQuantity) => {
        adsQuantity > itensShowed ? setShowMoreButton(true) : setShowMoreButton(false);
        if (showMoreButton) {
            let newAdList = [];
            originalAdList.slice(0, itensShowed).map(
                (item) => {
                    newAdList.push(item);
                }
            )
            setAdList(newAdList);
            setItensShowed(itensShowed + 10);
        } else {
            setAdList(originalAdList);
        }
    }

    if(!loaded){
        loadAds();
    }
    const filterAdvertisement = (text) =>{
        setSearchBarValue(text);
        let newAdList = [];
        originalAdList.slice(0, itensShowed - 10).map(
            (ad)=>{
                if(ad.title.toLowerCase().includes(text.toLowerCase())){
                    newAdList.push(ad);
                }   
            }
        )
        setAdList(newAdList);   
    }

    const handleLoadMore = () => {
        setSearchBarValue("");
        filterAdsQuantity(originalAdList.length);
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
                <Searchbar placeholder="Pesquisar" value={searchBarValue} onChangeText={(text)=>filterAdvertisement(text)} style={styles.searchBar}/>
                <Appbar.Action icon='refresh' onPress={() => setLoaded(false)}/>
                <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='account'  onPress={()=>openOption()}/>}>
                    <Menu.Item onPress={()=>{handleLogout(); closeOption()}} title="Deslogar"/>
                    <Menu.Item onPress={()=>{viewProfile(); closeOption()}} title="Ver Perfil"/>
                    
                </Menu>
            </Appbar.Header>
            <ScrollView>
                {
                    advertisementList.map((advertisement, index)=>{
                        return(
                            <AnuncioCardComponent key={index} advertisement={advertisement} navigation={navigation}/>
                        )
                    })
                }
                {showMoreButton ? 
                    <TouchableOpacity 
                        style={{ 
                            width: "40%",
                            height: 50,
                            alignItems: "center",
                            marginTop: 20,
                            marginLeft: '2%',
                            justifyContent:'center', 
                            backgroundColor:colors.primary
                        }} 
                        onPress={() => handleLoadMore()}
                    >
                        <Text style={styles.textButton}>Carregar mais</Text>
                    </TouchableOpacity>
                    :
                    null    
                }
                <View style = { styles.spacerStyle }></View>
            </ScrollView>
            <View >
                    <FAB
                        style={{margin:16, position:'fixed', right:0, bottom:0, backgroundColor:colors.primary}}
                        icon="plus"
                        onPress={() => navigation.push('CreateAdvertisement')}
                    />
            </View> 
        </View>
    )
}



export default ListPageComponent;