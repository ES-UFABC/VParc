import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
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
    },
    textContainer: {
        //marginTop: 10,
        marginBottom: 24,
        marginHorizontal: 30,
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "column"
    },
    inputView: {
        marginBottom: 8,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        flexDirection: "column",
    },
    inputText: {
        height: 45,
        textAlign: "center",
        width: "90%",
        fontFamily: 'Nunito_400Regular',
        color: colors.black,
        backgroundColor: colors.white
    },
    inputTextContainer: {
        flex: 1,
        marginHorizontal: 30,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'stretch',
        flexDirection: "column"
    },
});

export default styles;