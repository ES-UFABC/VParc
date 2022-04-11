import colors from "./colors"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: '8%'
    },
    appBar:{
        backgroundColor:colors.primary,
        color:colors.primary,
        flexDirection:'row',
    },
    appBarItem:{
        flex:1
    },
    appBarTitleItem:{
        fontSize:20,
        fontFamily:' Nunito_700Bold',
        textAlign: "left",
        alignSelf:"left",
        color: colors.white
    },
    tituloTag:{
        fontSize:28,
        fontFamily:' Nunito_700Bold',
        paddingLeft: "5%",
    },
    textoTag:{
        fontSize:18,
        fontFamily: 'Nunito_400Regular',
        paddingLeft: "5%",
    },
    bookConditionTag:{
        fontSize:18,
        fontFamily: 'Nunito_400Regular',
        textTransform:'capitalize',
        paddingLeft: "5%",
    },
    itemTag:{
        marginTop:'10%'
    },
    buttonUpdate:{
        flex:1, 
        backgroundColor:colors.primary, 
        margin:'5%'
    },
    buttonCancel:{
        flex:1, 
        backgroundColor:colors.register, 
        margin:'5%'
    },
    textButtonUpdate:{
        fontSize:20,
        fontFamily:' Nunito_700Bold',
        color:colors.white
    },
    textInput:{
        height: 45,
        textAlign: "center",
        width: "90%",
        fontFamily: 'Nunito_400Regular',
        color: colors.black,
        backgroundColor: colors.white,
        marginLeft: "5%",
    },
    image: {
        padding: '30%',
        width: '100%',
    },
    spacerStyle: {
        paddingTop: 20,
    },
    textTag: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        justifyContent: "center",
        paddingLeft: "5%",
    }
})

export default styles;