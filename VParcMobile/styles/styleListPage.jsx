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
    }
})

export default styles;