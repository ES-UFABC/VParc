import { TextInput } from "react-native-paper";
import styles from "../styles/styleUserRegistrationPage";
import colors from "../styles/colors";

const InputFieldRegistration = (props) => {
    return (
        <TextInput
            { ... props }
            outlineColor = { colors.white }
            activeOutlineColor = { colors.tertiary }
            mode = "outlined"
            style = { styles.inputText }
            left = { <TextInput.Icon name = "signature" color = { colors.grayMedium } />}
            placeholderTextColor = { colors.grayMedium }
            theme = { { colors: { text: colors.grayMedium } } }
        />
    );
}

export default InputFieldRegistration;
