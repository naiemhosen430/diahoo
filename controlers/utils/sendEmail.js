const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (userEmail, code) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_URL,
            port: process.env.HOST_PORT,
            secure: false,
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.PASSWORD
            }
        });

        // async..await is not allowed in global scope, must use a wrapper
        const info = await transporter.sendMail({
            from: process.env.MY_EMAIL,
            to: userEmail,
            subject: "Your confirmation code", 
            text: '',
            html: `<div><h1>Your vgerification code is</h1><a style="background-color: blue; color: white; font-size: 25px; padding: 5px 10px; display: block; text-align:center">${code}</a></div>`
        });
        const successfull = {
            statusCode: 200,
        }
        return successfull
    } catch (error) {
        console.log(error.message)
    }


}

module.exports = sendEmail