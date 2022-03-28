import styles from "../styles/styleLandPage";
import { TouchableOpacity,Text } from "react-native";

const MenuButtonComponent = (props) =>{
    return(
        <TouchableOpacity 
            style={{ 
                width: "80%",
                borderRadius: 25,
                height: 50,
                alignItems: "center",
                marginTop: 20,
                justifyContent:'center', 
                backgroundColor:props.cor
            }} 
            onPress={props.onPress}
        >
            <Text style={styles.textButton}>{props.titulo}</Text>
        </TouchableOpacity>
    );
}

export default MenuButtonComponent;