// Environment variables
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL, 
    DATABASE_NAME: process.env.DATABASE_NAME,
    USER_CREDENTIAL: process.env.USER_CREDENTIAL,
    SECRET_KEY_DB: process.env.SECRET_KEY_DB,
    SECRET_KEY_SESSION: process.env.SECRET_KEY_SESSION,
    GITHUB_CLIENT_ID: process.env.CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.CALLBACK_URL,
    JWT_KEY: process.env.JWT_KEY,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,
    COOKIE_EXTRACTOR_SCTKEY: process.env.COOKIE_EXTRACTOR_SCTKEY,
    HASH_LENGTH: process.env.HASH_LENGTH,
    DATASOURCE: process.env.PERSISTENCE || '',
    USER_EMAIL: process.env.USER_EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    ENVIRONMET: process.env.NODE_ENVIRONMET
};

export default config;

