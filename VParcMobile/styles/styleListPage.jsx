import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    appBar:{
        backgroundColor:colors.primary,
        color:colors.primary,
        justifyContent: "space-around"
    },
    searchBar:{
        backgroundColor:colors.secundary,
        width:'65%'
    },
    textButton:{
        color:colors.white,
        fontFamily:'Nunito_700Bold',
        fontSize:18
    },
    spacerStyle: {
        marginBottom: 15
    }
})

export default styles;