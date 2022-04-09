require("dotenv").config();
const crypto = require("crypto");

const secret = process.env.SIGNED_URL_SECRET;

class SignedURLService {

    async #getHash(url) {
        const hash = await crypto.createHmac("sha512", secret).update(url).digest("base64");
        return encodeURIComponent(hash);
    }

    async sign(url) {
        const hashed = await this.#getHash(url);
        return `${url}&hash=${hashed}`;
    }

    async verify(url) {
        const urlParts = url.split("&hash=");
        const hashed = await this.#getHash(urlParts[0]);
        return hashed === urlParts[1];
    }

}

module.exports = new SignedURLService();