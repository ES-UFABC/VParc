import axios from "axios";
const BASE_URL = 'http://localhost:3000/api';

const getAllCategories = async () => {
    let response;
    let categories = [{}];
    
    await axios.get(BASE_URL + '/category')
        .then(
            (response) => {
                categories = response.data;
            }
        )
        .catch(
            (error) => {
                categories = error.response.data
            }
        )
    console.log(categories)
    return categories
}

export {getAllCategories};