import colors from "./colors"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    appBar:{
        backgroundColor:colors.primary,
        color:colors.primary,
        flexDirection:'row',
        
    },
    appBarItem:{
        flex:1
    },
    appBarTitleItem:{
        flex:1,
        fontSize:20
    },
    tituloTag:{
        fontSize:30,
        fontFamily:'Nunito_800ExtraBold'
    },
    textoTag:{
        fontSize:20,
        fontFamily:'Nunito_800ExtraBold',
    },
    bookConditionTag:{
        fontSize:20,
        fontFamily:'Nunito_800ExtraBold',
        textTransform:'capitalize'
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
        fontFamily:'Nunito_800ExtraBold',
        color:colors.white
    },
    textInput:{
        backgroundColor:colors.tertiary
    }
})

export default styles;