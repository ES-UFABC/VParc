
import { useState } from "react";
import { Alert, Button } from "react-native";



const FirstComponent = () => {
    const [title,setTitle] = useState("Inicio");
    const [clicks,setClicks] = useState(0);
    return (
            <Button 
                title={title}
                onPress={
                        () => {
                            setClicks(clicks+1);
                            setTitle("Fui clicado " + clicks);
                        }
                    }
            />
    );
}

export default  FirstComponent;