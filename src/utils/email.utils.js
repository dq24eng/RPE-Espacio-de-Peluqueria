import { createTransport } from 'nodemailer';
import config from '../config/enviroment.config.js';
import { faker } from '@faker-js/faker/locale/es';

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

export const sendRestoreEmail = async (user, resPassCookie) => {
    resPassCookie == undefined ? resPassCookie=faker.database.mongodbObjectId() : '';
    const link = `http://localhost:${config.PORT}/restart/${user._id}/${resPassCookie}`
    const mail = {
        from: config.USER_EMAIL,
        to: user.email,
        subject: `Restore password`,
        html: `${user.first_name}, you're trying to change your password. Please, enter the following link: ${link}. If you did not request this change, please ignore this mail.`
    }
    await transporter.sendMail(mail);
}

export const deletedUserEmail = async (user) => {
    const mail = {
        from: config.USER_EMAIL, 
        to: user.email,
        subject: `Your account has been deleted`, 
        html: `Dear ${user.first_name}, we regret to inform you that your account has been deleted for not being used for more than 2 days. 
        \n Best regards, Romina Ponces Estilista.`
    }
    await transporter.sendMail(mail);
}