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
    JWT_KEY: process.env.JWT_KEY
};

export default config;

