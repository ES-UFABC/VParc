import React, { useState } from "react";
import { useAuth } from "../../context/userAuth";
import styles from "../../styles/styleAdvertisementPage";
import { Appbar, List, ActivityIndicator, Button, Menu, TextInput, Portal, Dialog, Paragraph, Badge } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { getAdFromUser } from "../../services/advertisementService";
import colors from "../../styles/colors";
import AppLoading from 'expo-app-loading';
import { deleteUser, updateUser } from "../../services/userService";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito';
import { getNotifications, readNotification } from "../../services/notificationService.js";
import { copyFileSync, read } from "fs";


const UserProfileComponent = ({navigation}) =>{
    const {user} = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [expandedNotifications, setExpandedNotifications] = useState(false);
    const [loadAds, setLoadAds] = useState(false);
    const [isLoadedNotifications, setLoadNotifications] = useState(false);
    const [advertisementList, setAdvertisementList] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [cellphone, setCellphone] = useState(user.cellphone);
    const [update,setUpdate] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const openDelete = () => setDeleteVisible(true);
    const closeDelete = () => setDeleteVisible(false);
    const openOption = () => setOptionsVisible(true);
    const closeOption = () => setOptionsVisible(false);
    const handlePress = async () => {
        setExpanded(!expanded);
    };
    const handlePressNotification = async () => {
        setExpandedNotifications(!expandedNotifications);
    };
    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
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

    const loadNotifications = async () => {
        await getNotifications(user).then((res)=>{
                setNotifications(res);
                getUnreadNotificationsCount(res);
                setLoadNotifications(true);
                
            }
        )
    }

    const getUnreadNotificationsCount = (res) =>{
        let unreadCount = 0;
        if(res.length > 0){
            res.map(notf=>{
                if(notf.read === false){
                    unreadCount++;
                }
            })
        }
        setUnreadNotifications(unreadCount);
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
        let userUpdt = user;
        userUpdt.cellphone = cellphone;
        await updateUser(userUpdt).then(
            (res)=>{
                setUpdate(false);
            }
        )
    }

    if(!loadAds){
        loadAdsFromUser();
        loadNotifications();
    }

    const confirmNotify = async(notification) => {
        await readNotification(notification).then(
            (res)=>{
                loadNotifications();
            }
        )
    }
    

    const showAdPage = (ad) =>{
        navigation.push('AdvertisementPage', ad);
    }
    

    return(
        <View>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='arrow-left' style={{flex:1, alignItems:'left'}} onPress={()=>navigation.pop()}/>
                <Text style={styles.appBarTitleItem}>Meu Perfil</Text>
                <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='dots-vertical' color = { colors.white } style={styles.appBarItem} onPress={()=>openOption()}/>}>
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
                        <TextInput theme={{ colors: {text: colors.grayLight, primary: colors.grayMedium, secundary: colors.grayMedium} }}  label="Celular" value={cellphone} onChangeText={(text)=>setCellphone(text)}></TextInput>
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
            {advertisementList.length > 0 ?
            
                <List.Section title="">
                    <List.Accordion
                        title="Meus anúncios"
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
                </List.Section> : null
            }
                {notifications.length > 0 ? 
                    <List.Section title="">
                        <List.Accordion
                            title="Minhas notificações"
                            left={props =><Badge size={25}>{unreadNotifications}</Badge>}
                            titleStyle={{fontFamily:'Nunito_800ExtraBold'}}
                            expanded={expandedNotifications}
                            onPress={() => handlePressNotification()}
                            style={{backgroundColor:colors.primary}}
                        >
                            {!isLoadedNotifications ? 
                                <ActivityIndicator style={{margin:'20px'}}/>:
                                notifications.map(
                                    (nots, index)=>{
                                        if(!nots.read){

                                            return(
                                                <List.Item 
                                                    key={index} 
                                                    style={{backgroundColor:colors.secundary}} 
                                                    title={nots.nameInterested  + ' - ' + nots.numberInterested} 
                                                    titleStyle={{fontFamily:'Nunito_800ExtraBold'}} 
                                                    descriptionStyle={{fontFamily:'Nunito_800ExtraBold'}} 
                                                    description={nots.advertisementTitle + " - Pressione para confirmar leitura"}
                                                    onPress={()=>confirmNotify(nots)}
                                                />
                                            )
                                        }else{
                                            return(
                                                <List.Item 
                                                    key={index} 
                                                    style={{backgroundColor:colors.grayMedium}} 
                                                    title={nots.nameInterested  + ' - ' + nots.numberInterested} 
                                                    titleStyle={{fontFamily:'Nunito_800ExtraBold'}} 
                                                    descriptionStyle={{fontFamily:'Nunito_800ExtraBold'}} 
                                                    description={nots.advertisementTitle}
                                                    //onPress={()=>confirmNotify(nots)}
                                                />
                                            )
                                        }
                                    }
                                )
                            }
                        </List.Accordion>
                    </List.Section> : null
                }
                
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
    }
})