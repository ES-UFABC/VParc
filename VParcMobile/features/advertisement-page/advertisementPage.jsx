import React, { useState} from "react";
import { View, Text, Image } from "react-native";
import {Appbar, Menu, Button, Dialog, Portal, Paragraph, TextInput, RadioButton} from 'react-native-paper'
import colors from "../../styles/colors";
import { 
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  } from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import { deleteAdvertisement, updateAdvertisement } from "../../services/advertisementService";
import styles from "../../styles/styleAdvertisementPage";
import AppLoading from 'expo-app-loading';
import { useAuth } from "../../context/userAuth";
const AdvertisementPageComponent = ({route, navigation}) =>{
    const {user} = useAuth();
    const anuncio = route.params;

    const [loaded, setLoaded] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [update,setUpdate] = useState(false);
    const [description,setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [bookCondition, setBookCondition] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImageUrl] = useState('');
    const [isOwner, setOwner] = useState(false);
    const openDelete = () => setDeleteVisible(true);
    const closeDelete = () => setDeleteVisible(false);
    const openOption = () => setOptionsVisible(true);
    const closeOption = () => setOptionsVisible(false);

    if(!loaded){
        setDescription(anuncio.description);
        setPrice(anuncio.price);
        setBookCondition(anuncio.bookCondition);
        setTitle(anuncio.title);
        setImageUrl(anuncio.imageUrl);
        setLoaded(true);
        if(user.id === anuncio.userId){
            setOwner(true);
        }
    }
    let [fontsLoaded] = useFonts({
        Nunito_200ExtraLight,
        Nunito_200ExtraLight_Italic,
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_700Bold
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
        <View style = { styles.container }>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon='arrow-left' style={{flex:1, alignItems:'left'}} onPress={()=>navigation.pop()}/>
                <Text style={styles.appBarTitleItem}>{anuncio.title}</Text>
                {isOwner ? 
                    <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='dots-vertical' color = { colors.white } style={styles.appBarItem} onPress={()=>openOption()}/>}>
                        <Menu.Item onPress={() => {openDelete(), setOptionsVisible(false)}} title="Deletar"/>
                        <Menu.Item onPress={()=>{setUpdate(true), setOptionsVisible(false)}} title="Atualizar"/>
                    </Menu>
                    :
                    null
                }
            </Appbar.Header>

            <View>
                <View style={styles.spacerStyle}></View>
                { (image === undefined) ?
                    <Text style={styles.tituloTag}>Anúncio sem imagem :(</Text>
                    :
                    <Image
                    style = { styles.image }
                    source = { { uri: image } }
                    />
                } 
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Título</Text>
                
                {update ? 
                    (<TextInput style={styles.textInput} 
                        label='Título' 
                        value={title} 
                        outlineColor = { colors.white }
                        activeOutlineColor = { colors.tertiary }
                        mode = "outlined"
                        placeholderTextColor = { colors.grayMedium }
                        theme = { { colors: { text: colors.grayMedium } } } 
                        onChangeText={(text)=>setTitle(text)}/>
                    )
                    :
                    (<Text style={styles.textoTag}>{anuncio.title}</Text>)
                }
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Descrição</Text>
                
                {update ? 
                    (<TextInput style={styles.textInput}
                        label='Descrição'
                        value={description} 
                        outlineColor = { colors.white }
                        activeOutlineColor = { colors.tertiary }
                        mode = "outlined"
                        placeholderTextColor = { colors.grayMedium }
                        theme = { { colors: { text: colors.grayMedium } } } 
                        onChangeText={(text)=>setDescription(text)}/>
                        )
                    :
                    (<Text style={styles.textoTag}>{anuncio.description}</Text>)
                }
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Preço</Text>
                
                {update ? 
                    (<TextInput style={styles.textInput} 
                        keyboardType='number-pad'
                        label='Preço' 
                        value={price} 
                        outlineColor = { colors.white }
                        activeOutlineColor = { colors.tertiary }
                        mode = "outlined"
                        placeholderTextColor = { colors.grayMedium }
                        theme = { { colors: { text: colors.grayMedium } } } 
                        onChangeText={(price)=>setPrice(price)}/>
                    )
                    :
                    (<Text style={styles.textoTag}>R${anuncio.price}</Text>)
                }
            </View>
            <View style={styles.itemTag}>
                <Text style={styles.tituloTag}>Condição do livro</Text>
                
                {update ? 
                (
                <View >
                    <View style={styles.textTag}>
                        <RadioButton 
                            color = { colors.primary }
                            uncheckedColor = { colors.secundary }
                            value='novo' 
                            status={bookCondition === 'novo' ? 'checked' : 'unchecked'}
                            onPress={()=>setBookCondition('novo')}
                        />
                        <Text style={styles.bookConditionTag}>Novo</Text>
                    </View>
                    <View style={styles.textTag}>
                        <RadioButton 
                            color = { colors.primary }
                            uncheckedColor = { colors.secundary }
                            value='usado' 
                            status={bookCondition === 'usado' ? 'checked' : 'unchecked'}
                            onPress={()=>setBookCondition('usado')}
                        />
                        <Text style={styles.bookConditionTag}>Usado</Text>
                    </View>
                </View>
                )
                :
                (<Text style={styles.bookConditionTag}>{anuncio.bookCondition}</Text>)
                }
            </View>

            {update ? 
            (
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:'5%'}}>
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


