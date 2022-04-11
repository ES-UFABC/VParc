import React, { useEffect, useState } from "react";
import { View, Text,ScrollView } from "react-native";
import { Appbar,  Searchbar, Drawer, Card, Title, Paragraph, Button, FAB, Portal, Menu } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";
import { useAuth } from "../../context/userAuth";
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
    const handleLogout = async ()=> { await logout();}
    const viewProfile = () => {navigation.push('UserProfile')}
    const loadAds = async() =>{
        await getAll().then(
            (ads)=>{
                setAdList(ads);
                setOriginalAdList(ads);
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
    if(!loaded){
        loadAds();
    }
    const filterAdvertisement = (text) =>{
        let newAdList = [];
        originalAdList.map((ad)=>{
            if(ad.title.toLowerCase().includes(text.toLowerCase())){
                newAdList.push(ad);
            }   
        })
        setAdList(newAdList);
    }
    return(
        <View>
            <Appbar.Header style={styles.appBar}>
                <Searchbar placeholder="Pesquisar" onChangeText={(text)=>filterAdvertisement(text)} style={styles.searchBar}/>
                <Appbar.Action icon='refresh' onPress={() => setLoaded(false)}/>
                {/* <Appbar.Action icon='account' onPress={() => handleLogout()}/> */}
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