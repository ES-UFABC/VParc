import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import InputFieldRegistration from "../../components/inputFieldRegistration";

const CreateAdvertisementComponent = ({navigation}) =>{

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [bookCondition, setBookCondition] = useState();

    const updateTitle = (title) =>{
        setTitle(title);
    }
    const updateDescription = (description) =>{
        setDescription(description);
    }
    const updatePrice = (price) =>{
        setPrice(price);
    }
    const updateBookCondition = (bookCondition) =>{
        setBookCondition(bookCondition);
    }

    return(
        <View>

            <ScrollView>
                
                <InputFieldRegistration 
                    value = {title}
                    placeholder = "Título"
                    onChangeText = { (title) => updateTitle(title) }
                />
                <InputFieldRegistration 
                    value = {description}
                    placeholder = "Descrição"
                    onChangeText = { (description) => updateTitle(description) }
                />
                <InputFieldRegistration 
                    value = {price}
                    placeholder = "Preço"
                    onChangeText = { (price) => updatePrice(price) }
                />
                <InputFieldRegistration 
                    value = {bookCondition}
                    placeholder = "Condição do Livro"
                    onChangeText = { (bookCondition) => updateBookCondition(bookCondition) }
                />
            </ScrollView>

        </View>
    )

}

export default CreateAdvertisementComponent;