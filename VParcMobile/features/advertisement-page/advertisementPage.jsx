import React, { useState} from "react";
import { View, Text } from "react-native";
import {Appbar, Menu, Button, Dialog, Portal, Paragraph, TextInput, RadioButton} from 'react-native-paper'
import colors from "../../styles/colors";
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_800ExtraBold,
  } from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import { deleteAdvertisement, updateAdvertisement } from "../../services/advertisementService";
import styles from "../../styles/styleAdvertisementPage";
import AppLoading from 'expo-app-loading';
const AdvertisementPageComponent = ({route, navigation}) =>{

    const anuncio = route.params;

    const [loaded, setLoaded] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [update,setUpdate] = useState(false);
    const [description,setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [bookCondition, setBookCondition] = useState('');
    const [title, setTitle] = useState('');
    const openDelete = () => setDeleteVisible(true);
    const closeDelete = () => setDeleteVisible(false);
    const openOption = () => setOptionsVisible(true);
    const closeOption = () => setOptionsVisible(false);

    if(!loaded){
        setDescription(anuncio.description);
        setPrice(anuncio.price);
        setBookCondition(anuncio.bookCondition);
        setTitle(anuncio.title);
        setLoaded(true);
    }
    let [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_800ExtraBold
      });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    

    const handleDelete = async () => {
        await deleteAdvertisement(anuncio)
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
        let anuncioObj = anuncio;
        anuncioObj.description = description;
        anuncioObj.price = parseInt(price);
        anuncioObj.bookCondition = bookCondition;
        anuncioObj.title = title;
        await updateAdvertisement(anuncioObj)
            .then(
                (response)=>{
                    console.log(response);
                    setUpdate(false);
                    if(response.data.status === true){
                        navigation.pop();
                    }
                }
            )
            .catch(
                (error)=>{
                    setUpdate(false);
                }
            )
    }


    return(
        <View style={{flex:1}}>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='arrow-left' style={{flex:1, alignItems:'left'}} onPress={()=>navigation.pop()}/>
                <Text style={styles.appBarTitleItem}>{anuncio.title}</Text>
                <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='dots-vertical' style={styles.appBarItem} onPress={()=>openOption()}/>}>
                    <Menu.Item onPress={() => openDelete()} title="Deletar"/>
                    <Menu.Item onPress={()=>{setUpdate(true)}} title="Atualizar"/>
                </Menu>
            </Appbar.Header>
            
            <View style={{backgroundColor:colors.grayMedium}}>
                <Text style={{textAlign:'center'}}>IMAGEM</Text>
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Título</Text>
                
                {update ? 
                    (<TextInput style={styles.textInput} label='Descrição' value={title} onChangeText={(text)=>setTitle(text)}/>)
                    :
                    (<Text style={styles.textoTag}>{anuncio.title}</Text>)
                }
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Descrição</Text>
                
                {update ? 
                    (<TextInput style={styles.textInput} label='Descrição' value={description} onChangeText={(text)=>setDescription(text)}/>)
                    :
                    (<Text style={styles.textoTag}>{anuncio.description}</Text>)
                }
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Preço</Text>
                
                {update ? 
                    (<TextInput style={styles.textInput} keyboardType='number-pad' label='Preço' value={price} onChangeText={(price)=>setPrice(price)}/>)
                    :
                    (<Text style={styles.textoTag}>R${anuncio.price}</Text>)
                }
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Condição do livro</Text>
                
                {update ? 
                (
                <View >
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.bookConditionTag}>Novo</Text>
                        <RadioButton 
                            color={colors.primary}
                            uncheckedColor={colors.secundary}
                            value='novo' 
                            status={bookCondition === 'novo' ? 'checked' : 'unchecked'}
                            onPress={()=>setBookCondition('novo')}
                        />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.bookConditionTag}>Usado</Text>
                        <RadioButton 
                            color={colors.primary}
                            uncheckedColor={colors.secundary}
                            value='usado' 
                            status={bookCondition === 'usado' ? 'checked' : 'unchecked'}
                            onPress={()=>setBookCondition('usado')}
                        />
                    </View>
                </View>
                )
                :
                (<Text style={styles.bookConditionTag}>{anuncio.bookCondition}</Text>)
                }
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
            

            <Portal>
                <Dialog visible={deleteVisible} onDismiss={() => closeDelete()}>
                    <Dialog.Title> Atenção </Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Tem certeza que deseja deletar o anúncio?</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button style={{textAlign:'left'}} onPress={() => closeDelete()}>Não</Button>
                        <Button onPress={() => handleDelete()}>Sim</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


        </View>
    )
}

export default AdvertisementPageComponent;


