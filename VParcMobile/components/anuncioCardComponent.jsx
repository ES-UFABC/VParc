import React from "react";
import { Card,  Paragraph, Button } from "react-native-paper";
import colors from "../styles/colors";
import { useFonts } from "@expo-google-fonts/nunito";
import { 
    
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold
} from '@expo-google-fonts/nunito';

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
                {anuncio.price !== 0 ? <Paragraph style={{ color:colors.black}}>R$ {anuncio.price} </Paragraph> : 
                <Paragraph style={{ color:colors.black}}>Doação </Paragraph>
                }
            </Card.Content>
            <Card.Actions>
                <Button  onPress={()=>showAdPage()}>Ver detalhes</Button>
            </Card.Actions>
        </Card> 
    );
}

export default AnuncioCardComponent;