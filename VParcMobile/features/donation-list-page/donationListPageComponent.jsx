import React, { useEffect, useState, Component } from "react";
import { View, Text,ScrollView, TouchableOpacity } from "react-native";
import { Appbar,  Searchbar, Snackbar,  Paragraph, Button, FAB,  Menu, ActivityIndicator } from "react-native-paper";
import Select from "react-select";
import colors from "../../styles/colors";
import styles from "../../styles/styleListPage";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
  } from '@expo-google-fonts/nunito';
import { useAuth } from "../../context/userAuth";
import AppLoading from 'expo-app-loading';
import { getAll } from "../../services/advertisementService";
import { getAllCategories } from "../../services/categories";
import AnuncioCardComponent from "../../components/anuncioCardComponent";

function DonationListPageComponent({ navigation }) {

    const { logout } = useAuth();
    const categoriesList = [];
    const categoriesSelectedList = [];
    const [originalAdList, setOriginalAdList] = useState([]);
    const [advertisementList, setAdList] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [optionsVisible, setOptions] = useState(false);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [itensShowed, setItensShowed] = useState(10);
    const [searchBarValue, setSearchBarValue] = useState('');
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const [filterQuantity, setFilterQuantity] = useState(0);
    const [categoriesFiltered, setCategoriesFiltered] = useState(0);
    const [categories, setCategories] = useState([{
        label: '',
        value: '',
    }]);

    const handleLogout = async () => { await logout(); };
    const viewProfile = () => { navigation.push('UserProfile'); };
    const loadAds = async () => {
        await getAll().then(
            (ads) => {
                let arrayAd = [];
                ads.map((ad) => {
                    if (ad.price === 0) {
                        arrayAd.push(ad);
                    }
                });
                setOriginalAdList(arrayAd.reverse());
                setAdList(originalAdList);
                filterAdsQuantity(arrayAd.length);
                setLoaded(true);
            }
        )
    };

    const handleCategories = async () => {
        await getAllCategories().then(
            (response)=>{
                if (response.status === true) {
                    response.data.result.map(
                        (category, index) => {
                            let categoryObj = { value: category._id, label: category.description };
                            categoriesList.push(categoryObj); 
                        }
                    )
                    setCategories(categoriesList);
                }
                else {
                    setIsSnackBarVisible(true);
                    setSnackBarText("Ops, não conseguimos carregar as categorias dos livros.");
                    setTimeout(() => navigation.pop(), 10000);
                }
                setLoaded(true);
            }
        )
    }

    if(!loaded){
        loadAds();
        handleCategories();
    }

    const openOption = () => {
        setOptions(true);
    };
    const closeOption = () => {
        setOptions(false);
    };

    const filterAdsQuantity = (adsQuantity, buttonState) => {
        adsQuantity > itensShowed ? setShowMoreButton(true) : setShowMoreButton(false);
        if (showMoreButton) {
            let newAdList = [];
            originalAdList.slice(0, itensShowed).map(
                (item) => {
                    newAdList.push(item);
                }
            );
            setAdList(newAdList);
            setItensShowed(itensShowed + 10);
        } else {
            setAdList(originalAdList);
        }
    };

    const filterAdvertisement = (text) => {
        let newAdList = [];
        originalAdList.slice(0, itensShowed - 10).map(
            (ad) => {
                if (ad.title.toLowerCase().includes(text.toLowerCase())) {
                    newAdList.push(ad);
                }
            }
        );
        // setSearchBarValue(text);
        setAdList(newAdList);
        setSearchBarValue(text);
    };

    const clearFilterByCategory = () => {
        let newAdList = [];
        originalAdList.slice(0, itensShowed - 10).map(
            (ad) => {
                newAdList.push(ad);
            }
        );
        originalAdList.length > (itensShowed-10) ? setShowMoreButton(true) : setShowMoreButton(false);
        setAdList(newAdList);
    }

    const filterByCategory = (categories) => {
        clearFilterByCategory();
        let newAdList = [];
        if (categories.length !== 0) {
            if (categories.length === 1) {
                originalAdList.slice(0, itensShowed - 10).map(
                    (ad) => {
                        ad.categoryIds.map(
                            (adCategorie) => {
                                if (adCategorie === categories[0].value) {
                                    newAdList.push(ad);
                                }
                            }
                        )
                    }
                );
            }
            else {
                originalAdList.slice(0, itensShowed - 10).map(

                    (ad) => {
                        setFilterQuantity(ad.categoryIds.length);
                        setCategoriesFiltered(0);
                        ad.categoryIds.map(

                            (adCategorie) => {
                                categories.map(

                                    (filterCategorie) => {
                                        if (adCategorie == filterCategorie.value) {
                                            if (adCategorie == categories.value) {
                                                setCategoriesFiltered(categoriesFiltered + 1);
                                            }
                                        }
                                    }
                                )
                            }
                        )
                    }
                );
            }
            setShowMoreButton(false);
            setAdList(newAdList);
        } 
    };

    const handleLoadMore = () => {
        setSearchBarValue("");
        filterAdsQuantity(originalAdList.length);
    };

    const onDismissSnackBar = () => setIsSnackBarVisible(false);
    
    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
        Nunito_700Bold,
        Nunito_800ExtraBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View>
            <Appbar.Header style={styles.appBar}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.pop()} />
                <Searchbar placeholder="Pesquisar" value={searchBarValue} onChangeText={(text) => filterAdvertisement(text)} style={styles.searchBar} />
                <Appbar.Action icon='refresh' onPress={() => {setLoaded(false), setItensShowed(10)}} />
                <Menu visible={optionsVisible} onDismiss={closeOption} anchor={<Appbar.Action icon='account' onPress={() => openOption()} />}>
                    <Menu.Item onPress={() => { handleLogout(); closeOption(); } } title="Deslogar" />
                    <Menu.Item onPress={() => { viewProfile(); closeOption(); } } title="Ver Perfil" />

                </Menu>
            </Appbar.Header>

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
            <Select
                isMulti
                name="colors"
                options={categories}
                placeholder="Filtrar por categoria"
                styles={{ width: 500 }}
                className="basic-multi-select"
                onChange= {filterByCategory}
                classNamePrefix="select" 
            />
            <ScrollView>
                {
                    advertisementList.map((advertisement, index) => {
                        return (
                            <AnuncioCardComponent key={index} advertisement={advertisement} navigation={navigation} />
                        );
                    })}
            </ScrollView>

            {showMoreButton ?
                <TouchableOpacity
                    style={{
                        width: "40%",
                        height: 50,
                        alignItems: "center",
                        marginTop: 20,
                        marginLeft: '2%',
                        justifyContent: 'center',
                        backgroundColor: colors.primary
                    }}
                    onPress={() => handleLoadMore()}
                >
                    <Text style={styles.textButton}>Carregar mais</Text>
                </TouchableOpacity>
                :
                null}

            <View>
                <FAB
                    style={{ position: 'fixed', right: "2%", bottom: 15, backgroundColor: colors.primary }}
                    icon="plus"
                    onPress={() => navigation.push('CreateAdvertisement')} />
            </View>

            <View style={ styles.spacerStyle }></View>
        </View>
    );
}



export default DonationListPageComponent;