import React, { useEffect, useState } from "react";
import { View, Text,ScrollView, TouchableOpacity } from "react-native";
import { Appbar,  Searchbar,  Card,  Paragraph, Button, FAB,  Menu, ActivityIndicator } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito';
import { useAuth } from "../../context/userAuth";
import AppLoading from 'expo-app-loading';
import { getAll } from "../../services/advertisementService";
import SwitchSelector from "react-native-switch-selector";

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
                {anuncio.price !== 0 ? <Paragraph style={{ color:colors.black}}>R$ {anuncio.price} </Paragraph> : 
                <Paragraph style={{ color:colors.black}}>Doação </Paragraph>
                }
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
    const [isDonation, setDonation] = useState(false);
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
                let arrayAd = [];
                ads.map((ad)=>{
                    if(isDonation && ad.price == 0){
                        arrayAd.push(ad);
                    }
                    if(!isDonation && ad.price > 0){
                        arrayAd.push(ad);
                    }
                })
                setOriginalAdList(arrayAd.reverse());
                filterAdsQuantity(arrayAd.length);
            }
        ).finally(()=>{setLoaded(true);setIsLoadingAd(false);
        })
    
    }
    // if(!loaded){
    //     loadAds();
    // }
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

    const changeToDonation = (value) =>{

        if(value == 0){
            setDonation(false);
        }else{
            setDonation(true);
        }
        setOriginalAdList([]);
        setLoaded(false);
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
                        style={{margin:24, position:'fixed', right:0, bottom:50, backgroundColor:colors.primary}}
                        icon="plus"
                        onPress={() => navigation.push('CreateAdvertisement')}
                    />
            </View> 
            
            <SwitchSelector 
                style={{margin:10, position:'fixed', bottom:0, width:'95%'}}
                initial ={0}
                onPress={(value) => changeToDonation(value)}
                options={
                    [   
                        {label:"VENDA", value:0},
                        {label:"DOAÇÃO", value:1}
                    ]
                }
                textColor={colors.primary}
                backgroundColor={colors.grayLight}
                selectedColor={colors.white}
                buttonColor={colors.primary}
                buttonMargin={1}
            />
        </View>
    )
}



export default ListPageComponent;