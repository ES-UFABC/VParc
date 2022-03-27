import React, { useEffect, useState } from "react";
import { View, Text,ScrollView } from "react-native";
import { Appbar,  Searchbar, Drawer, Card, Title, Paragraph, Button, FAB } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";
import listaAnuncios from "../../mock/anunciosMock";
import { useAuth } from "../../context/userAuth";
import { getAll } from "../../services/advertisementService";

const AnuncioCardComponent = (props) =>{
    let anuncio = props.advertisement;
    return(
        <Card style={{backgroundColor:'gray', marginTop:'10%'}}>
            <Card.Title title={anuncio.title}/>
            <Card.Content>
                <Paragraph>{anuncio.description}</Paragraph>  
            </Card.Content>
            <Card.Actions>
                <Button style={{alignItems:'right'}}>Ver detalhes</Button>
            </Card.Actions>
        </Card> 
    );
}

const ListPageComponent = ({navigation}) => {
    
    const { logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [drawerActive, setDrawer] = useState(false);
    const [advertisementList, setAdList] = useState([]);
    
    const updateDrawer = () =>{
        setDrawer(!drawerActive);
        
    }
    const handleLogout = async ()=> { await logout();}

    const createAdvertisement = () =>{
        navigation.push()
    }

    useEffect(()=>{
        //carregar a lista de anuncios quando terminar de carregar a página
        getAll().then(
            (ads)=>{
                setAdList(ads);
            }
        )
    })

    return(
        <View>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='text' onPress={()=>updateDrawer()}/>
                <Searchbar placeholder="Pesquisar" style={styles.searchBar}/>
                <Appbar.Action icon='filter' />
                <Appbar.Action icon='account' onPress={() => handleLogout()}/>

            </Appbar.Header>

            {drawerActive?(
                <Drawer.Section style={{backgroundColor:colors.primary}}>
                    <Drawer.Item label="Logout" icon='logout'  />
                </Drawer.Section>) : null
            }
            <ScrollView>
            {
                advertisementList.map((advertisement, index)=>{
                    
                    return(
                        <AnuncioCardComponent key={index} advertisement={advertisement}/>
                    )
                })
            }
            </ScrollView>
            <FAB
                style={{margin:16, position:'absolute', right:0, bottom:0}}
                small
                icon="plus"
                onPress={() => navigation.push('CreateAdvertisement')}
            />
            
        </View>
    )
}



export default ListPageComponent;