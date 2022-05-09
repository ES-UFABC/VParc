import axios from "axios";

const log = () =>{
    console.log(process.env.BASE_URL);
}

const getAllCategories = async () => {
    log();
    let categories = [{}];
    await axios.get(process.env.BASE_URL + '/category')
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