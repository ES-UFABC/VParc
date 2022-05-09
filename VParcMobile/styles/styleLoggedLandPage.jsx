import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    appBar:{
        backgroundColor:colors.primary,
        color:colors.primary,
        justifyContent: "flex-end"
    },
    textButton:{
        color:colors.white,
        fontFamily:'Nunito_700Bold',
        fontSize:18
    },
    spacerStyle: {
        marginBottom: 15
    },
    tituloTag:{
        fontSize:24,
        fontFamily:' Nunito_700Bold',
        paddingLeft: "2%",
    },
})

export default styles;