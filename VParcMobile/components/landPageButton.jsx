import styles from "../styles/styleLoggedLandPage";
import { TouchableOpacity,Text } from "react-native";
import colors from "../styles/colors";

const LandPageButtonComponent = (props) =>{
    return(
        <TouchableOpacity 
            style={{ 
                height: 50,
                alignItems: "center",
                marginStart: '2%',
                marginEnd: '2%',
                marginBottom: '2%',
                justifyContent:'center', 
                backgroundColor:props.cor
            }} 
            onPress={props.onPress}
        >
            <Text style={styles.textButton}>{props.titulo}</Text>
        </TouchableOpacity>
    );
}

export default LandPageButtonComponent;