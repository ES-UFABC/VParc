import React, { useEffect, useState } from "react";
import { View, Text,ScrollView } from "react-native";
import { Appbar,  Searchbar, Drawer, Card, Title, Paragraph, Button, FAB, Portal } from "react-native-paper";
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
                <Button style={{alignItems:'right'}} onPress={()=>showAdPage()}>Ver detalhes</Button>
            </Card.Actions>
        </Card> 
    );
}

const ListPageComponent = ({navigation}) => {
    
    const { logout } = useAuth();
    // const [searchQuery, setSearchQuery] = useState('');
    // const [drawerActive, setDrawer] = useState(false);
    const [advertisementList, setAdList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // const updateDrawer = () =>{
    //     setDrawer(!drawerActive);
        
    // }
    const handleLogout = async ()=> { await logout();}

    const createAdvertisement = () =>{
        navigation.push()
    }

    useEffect(()=>{
        //carregar a lista de anuncios quando terminar de carregar a página
        if(!loaded){
            getAll().then(
                (ads)=>{
                    setAdList(ads);
                    setLoaded(true);
                }
            )
        }
        
    })

    return(
        <View>
            <Appbar.Header style={styles.appBar}>
                {/* <Appbar.Action icon='text' onPress={()=>updateDrawer()}/> */}
                <Searchbar placeholder="Pesquisar" style={styles.searchBar}/>
                <Appbar.Action icon='filter' />
                <Appbar.Action icon='account' onPress={() => handleLogout()}/>
                <Appbar.Action icon='refresh' onPress={() => setLoaded(false)}/>
            </Appbar.Header>
            
            {/* {drawerActive?(
                <Drawer.Section style={{backgroundColor:colors.primary}}>
                    <Drawer.Item label="Logout" icon='logout'  />
                </Drawer.Section>) : null
            } */}
            
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
                        style={{margin:16, position:'fixed', right:0, bottom:0}}
                        icon="plus"
                        onPress={() => navigation.push('CreateAdvertisement')}
                    />
            </View>
            
        </View>
    )
}



export default ListPageComponent;