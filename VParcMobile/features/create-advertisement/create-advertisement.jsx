import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Nunito_300Light, Nunito_400Regular, Nunito_800ExtraBold} from '@expo-google-fonts/nunito'
import { useFonts } from "@expo-google-fonts/nunito";
import styles from "../../styles/styleCreateAdvertisement";
import colors from "../../styles/colors";
import InputFieldRegistration from "../../components/inputFieldRegistration";
import { PaperSelect } from 'react-native-paper-select';
import { ActivityIndicator, Snackbar, RadioButton } from "react-native-paper";
import { getAllCategories } from "../../services/categories";
import { createAdvertisement } from "../../services/advertisementService";
import MenuButtonComponent from "../../components/menuButtonComponent";
import AppLoading from 'expo-app-loading';
const CreateAdvertisementComponent = ({navigation}) =>{

    let categoriesList = [];
    let selectedCategoriesList = [];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [bookState, setBookState] = useState('first');
    const [bookCondition, setBookCondition] = useState('novo');
    const [snackBarText, setSnackBarText] = useState('');
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
    const [categories, setCategories] = useState({
        value: '',
        list: [],
        selectedList: [],
        error: '',
    });

    const updateTitle = (title) =>{
        setTitle(title);
    }
    const updateDescription = (description) =>{
        setDescription(description);
    }
    const updatePrice = (price) =>{
        setPrice(price);
    }

    const updateSelectedCategories = (value) => {
        selectedCategoriesList = [];
        value.selectedList.map (
            (category, index) => {
                selectedCategoriesList.push(category._id);
            }
        )
        setCategories({
            ...categories,
            selectedList: selectedCategoriesList
        })
    }

    const handleCategories = async () => {
        if(!loaded){
            await getAllCategories().then(
                (response)=>{
                    if (response.status === true) {
                        setLoaded(true);
                        response.data.result.map(
                            (category, index) => {
                                let categoryObj = { _id: category._id, value: category.description };
                                categoriesList.push(categoryObj); 
                            }
                        )
                        setCategories({
                            ...categories,
                            list: categoriesList
                        })
                    }
                    else {
                        setIsSnackBarVisible(true);
                        setSnackBarText("Ops, não conseguimos carregar as categorias dos livros.");
                        setTimeout(() => navigation.pop(), 10000);
                    }
                }
            )
        }
    }

    const handleRegister = async () => {
        let registerObj = {
            title: title,
            description: description,
            price: parseInt(price),
            bookCondition: bookCondition,
            categoryIds: categories.selectedList,
            userId: "623f55f68808e77b14547d24" //Retirar userID
        }
        await createAdvertisement(registerObj).then( (response) => {
            if (response.status === true) {
                setIsSnackBarVisible(true);
                setSnackBarText("Anúncio criado com sucesso :)");
                setTimeout(() => navigation.pop(), 3000);
            }
            else {
                setIsSnackBarVisible(true);
                setSnackBarText("Algo deu errado, confira as informações preenchidas e tente novamente.");
            }
        })
    }

    const onDismissSnackBar = () => setIsSnackBarVisible(false);

    useEffect(()=>{
        handleCategories();
    })

    let [fontsLoaded] = useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_800ExtraBold,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return(
        <View style = { styles.container }>

            <ScrollView>
                <View style = { styles.textContainer} >
                    <InputFieldRegistration 
                        value = {title}
                        placeholder = "Título"
                        onChangeText = { (title) => updateTitle(title) }
                    />
                    <View style = { styles.spacerStyle } />
                    <InputFieldRegistration 
                        value = {description}
                        placeholder = "Descrição"
                        onChangeText = { (description) => updateDescription(description) }
                    />
                    <View style = { styles.spacerStyle } />
                    <InputFieldRegistration 
                        value = {price}
                        placeholder = "Preço"
                        onChangeText = { (price) => updatePrice(price) }
                    />
                    <View style = { styles.spacerStyle } />
                    <Text style = { styles.description }>
                        Condição do Livro
                    </Text>
                    <View style = { styles.spacerStyle } />
                    <View style = { styles.textTag } >
                        <RadioButton
                            value = 'Novo'
                            status = { bookState === 'first' ? 'checked' : 'unchecked' }
                            onPress = { () => {
                                                setBookCondition('novo'),
                                                setBookState('first') 
                                              }}
                            color = { colors.primary }
                            uncheckedColor = { colors.secundary }
                        />
                        <Text>
                            Novo
                        </Text>
                    </View>
                    <View style = { styles.textTag } >
                        <RadioButton
                            value = 'Usado'
                            status = { bookState === 'second' ? 'checked' : 'unchecked' }
                            onPress = { () => {
                                                setBookCondition('usado'),
                                                setBookState('second') 
                                              }}                                
                            color = { colors.secundary }
                            uncheckedColor = { colors.tertiary }
                        />
                        <Text>
                            Usado
                        </Text>
                    </View>
                    <View style = { styles.spacerStyle } />
                    <PaperSelect
                        label='Categorias do livro'
                        value={categories.value}
                        onSelection={(value) => {
                            updateSelectedCategories(value);
                        }}
                        arrayList={[...categories.list]}
                        selectedArrayList={categories.selectedList}
                        errorText={categories.error}
                        multiEnable={true}
                        placeholder = "Categoria"
                        textInputMode="flat"
                        dialogTitleStyle={{ color: colors.black }}
                        activeUnderlineColor = { colors.secundary }
                        searchStyle={{ iconColor: colors.grayLight,
                                       backgroundColor: colors.tertiary,
                                       borderColor: colors.secundary }}
                        textInputBackgroundColor = { colors.secundary }
                    />
                    <View style = { styles.spacerStyle } />
                    <MenuButtonComponent
                        titulo = "Criar anúncio"
                        cor = { colors.primary }
                        onPress = { () => handleRegister() }
                    />

                </View>
            </ScrollView>

            <Snackbar
                visible = {isSnackBarVisible}
                onDismiss = {onDismissSnackBar}
                theme = {{colors: {accent: colors.register}}}
                action = {{
                    icon: "close",
                    onPress: () => onDismissSnackBar
                }}>
                <Text>{ snackBarText }</Text>
            </Snackbar>

        </View>
    );

}

export default CreateAdvertisementComponent;