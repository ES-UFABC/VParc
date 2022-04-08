require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

class CloudinaryService {

    async upload(file) {
            
        try {

            const result = await cloudinary.uploader.upload(file);

            return {
                status: true,
                data: {
                    url: result.url,
                    format: result.format,
                    bytes: result.bytes,
                    width: result.width,
                    height: result.height
                }
            }
            
        } catch (err) {
            console.log(err);
            return {
                status: false,
                message: "Não foi possível fazer o upload da imagem."
            }
        }
    
    }

}

module.exports = new CloudinaryService();