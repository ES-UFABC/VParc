import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
        margin: 30
    },
    spacerStyle: {
        marginBottom: 15,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Nunito_800ExtraBold'
    },
    description: {
        color: colors.grayMedium,
        fontWeight: 'normal',
        fontSize: 16,
        fontFamily: 'Nunito_400Regular'
    }
});

export default styles;