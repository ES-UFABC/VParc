import React, { useState } from "react";
import { View, Text } from "react-native";
import { Appbar,  Searchbar, Drawer, Card, Title, Paragraph, Button } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";
import listaAnuncios from "../../mock/anunciosMock";
import { useAuth } from "../../context/userAuth";


const AnuncioCardComponent = (props) =>{
    let anuncio = props.anuncio;
    return(
        <Card style={{backgroundColor:'gray', marginTop:'10%'}}>
            <Card.Title title={anuncio.titulo}/>
            <Card.Content>
                <Paragraph>{anuncio.descricao}</Paragraph>  
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

    const updateDrawer = () =>{
        setDrawer(!drawerActive);
        
    }
    const handleLogout = async ()=> { await logout();}
    
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

            {
                listaAnuncios.map((anuncio, index)=>{
                    return(
                    <AnuncioCardComponent key={index} anuncio={anuncio}/>)
                })
            }
            
            
        </View>
    )
}



export default ListPageComponent;