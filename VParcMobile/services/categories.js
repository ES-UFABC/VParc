import axios from "axios";
const BASE_URL = 'http://192.168.15.13:3000/api';

const getAllCategories = async () => {
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
    return categories
}

export {getAllCategories};