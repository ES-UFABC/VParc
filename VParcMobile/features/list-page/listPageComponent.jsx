import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Appbar,  Searchbar, Drawer } from "react-native-paper";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";

const ListPageComponent = ({navigation}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [drawerActive, setDrawer] = useState(false);

    const updateDrawer = () =>{
        setDrawer(!drawerActive);
        
    }

    return(
        <SafeAreaView>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='text' onPress={()=>updateDrawer()}/>
                <Searchbar placeholder="Pesquisar" style={styles.searchBar}/>
                <Appbar.Action icon='filter' />
                <Appbar.Action icon='account'/>

            </Appbar.Header>
            {drawerActive?(
                <Drawer.Section style={{backgroundColor:colors.primary}}>
                    <Drawer.Item label="teste" icon='plus'/>
                </Drawer.Section>) : null
            }
            
        </SafeAreaView>
    )
}



export default ListPageComponent;