import { TextInput} from "react-native-paper";
import styles from "../styles/styleLoginPage";
import colors from "../styles/colors";

const InputFieldLogin = (props) =>{
    return (
      <TextInput 
        {...props}
        outlineColor={colors.tertiary}
        activeOutlineColor='#ffffff'
        mode='flat'
        style={styles.inputText}
        underlineColor={colors.tertiary}  
        activeUnderlineColor={colors.tertiary} 
        left={<TextInput.Icon name='signature'/>}
      />
  );
  }

  export default InputFieldLogin;