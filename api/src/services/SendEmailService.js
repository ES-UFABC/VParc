require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class SendEmailService {

    async send(message) {

        const msg = {
            to: message.to,
            from: message.from,
            subject: message.subject,
            text: message.text,
            html: message.html
        };

        try {
            
            const result = await sgMail.send(msg);
            return result;

        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = new SendEmailService();