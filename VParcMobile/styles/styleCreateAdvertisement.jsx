import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textContainer: {
        flex: 1,
        flexWrap: "wrap",
        marginTop: 24,
        marginHorizontal: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        flexDirection: "column",
    },
    spacerStyle: {
        marginBottom: 15,
    },
    description: {
        color: colors.black,
        fontWeight: 'regular',
        fontSize: 16,
        fontFamily: 'Nunito_400Regular',
        alignItems: "center",
        alignSelf: "flex-start",
        justifyContent: "center"
    },
    textTag: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        justifyContent: "center"
    }
});

export default styles;