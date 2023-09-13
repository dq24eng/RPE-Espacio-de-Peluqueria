import { createTransport } from 'nodemailer';
import config from '../config/enviroment.config.js';

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth:{
        user: config.USER_EMAIL,
        pass: config.PASSWORD_EMAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail= async (ticket) => {
    const mail = {
        from: config.USER_EMAIL,
        to: ticket.purchaser.email,
        subject: `Thank you for your purchase ${ticket.purchaser.name}`,
        html: `Your purchased was processed successfully! Your id ticket is ${ticket.code}`
    }
    await transporter.sendMail(mail);
}

export default sendEmail;