import React, { useState } from "react";
import { useAuth } from "../../context/userAuth";
import styles from "../../styles/styleAdvertisementPage";
import { Appbar, List, ActivityIndicator, Button, Menu, TextInput, Portal, Dialog, Paragraph } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { getAdFromUser } from "../../services/advertisementService";
import colors from "../../styles/colors";
import AppLoading from 'expo-app-loading';
import { deleteUser } from "../../services/userService";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito';

  
const UserProfileComponent = ({navigation}) =>{
    const {user} = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [loadAds, setLoadAds] = useState(false);
    const [advertisementList, setAdvertisementList] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [cellphone, setCellphone] = useState(user.cellphone);
    const [update,setUpdate] = useState(false);

    const openDelete = () => setDeleteVisible(true);
    const closeDelete = () => setDeleteVisible(false);
    const openOption = () => setOptionsVisible(true);
    const closeOption = () => setOptionsVisible(false);
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
        await getAdFromUser(user.id).then(
            (ads)=>{
                setAdvertisementList(ads);
                setLoadAds(true);
            }
        )
    }
    const handleDelete = async () => {
        await deleteUser(user)
            .then(
                (response)=>{
                    setDeleteVisible(false);
                    if(response.data.status === true){
                        navigation.pop();
                    }
                }
            )
    }
    const handleUpdate = async() =>{
        console.log("Test");
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
                <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='dots-vertical' style={styles.appBarItem} onPress={()=>openOption()}/>}>
                            <Menu.Item onPress={() => {openDelete(); closeOption()}} title="Deletar"/>
                            <Menu.Item onPress={()=>{setUpdate(true); closeOption()}} title="Atualizar"/>
                </Menu>
            </Appbar.Header>
            <View style={styleUser.primeiraParte}>
                <View style={styleUser.drawImg}>
                </View>
                <View style={styleUser.userData}>
                    <Text style={styleUser.userData}>Nome: {user.first_name} {user.last_name}</Text>
                    <Text style={styleUser.userData}>Email: {user.email}</Text>
                    <Text style={styleUser.userData}>RA: {user.ra}</Text>
                    {!update ? 
                        <Text style={styleUser.userData}>Celular: {user.cellphone}</Text> :
                        <TextInput  style={styles.textInput} label="Celular" value={cellphone} onChangeText={(text)=>setCellphone(text)}></TextInput>
                    }
                </View>
            </View>
            {update ? 
            (
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Button style={styles.buttonCancel} labelStyle={styles.textButtonUpdate} mode="contained" onPress={()=>{setUpdate(false)}}>Cancelar</Button>
                    <Button style={styles.buttonUpdate} labelStyle={styles.textButtonUpdate} mode="contained" onPress={()=>handleUpdate()}>Salvar</Button>
                </View>
            ):
                null
            } 

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
            <Portal>
                <Dialog visible={deleteVisible} onDismiss={() => closeDelete()}>
                    <Dialog.Title> ATENÇÃO </Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>TEM CERTEZA QUE DESEJA DELETAR SEU USUÁRIO?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button style={{textAlign:'left'}} onPress={() => closeDelete()}>NÃÃÃÃÃO</Button>
                        <Button onPress={() => handleDelete()}>sim</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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