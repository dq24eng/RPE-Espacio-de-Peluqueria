// Libraries 
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";
// System configurations
import __dirname from './utils.js';
// Environment variables
import config from './config/enviroment.config.js';
// Passport 
import passport from "passport";
import initializedPassport from "./config/passport.config.js";
// Routers 
import productsRouter from "./routers/products.router.js";
import viewsRouter from "./routers/views.router.js";
import sessionsRouter from "./routers/sessions.router.js";
import cartsRouter from "./routers/carts.router.js";
import usersRouter from "./routers/users.routers.js";
//Logger
import logger from "./utils/logger.utils.js";
import testRouter from "./routers/tests.router.js";

// Server 
const app = express(); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// MongoDB

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        logger.info(`${new Date().toUTCString()} - Connected to Mongo Atlas`)
    } catch (error) {
        logger.info(`${new Date().toUTCString()} - Failed connection with Mongo Atlas ${error}`)
    }
};
connectMongoDB();

app.use(express.static(`${__dirname}/public`));
app.use(session({
    store: MongoStore.create({ mongoUrl: config.MONGO_URL }),
    secret: config.SECRET_KEY_SESSION,
    resave: false,
    saveUninitialized: false
}));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

//Passport 
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("secretKey"));

// Routes 
app.use(express.json())
app.use('/', viewsRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/users/', usersRouter.getRouter());
app.use('/carts', cartsRouter.getRouter()); 
app.use('/loggerTest', testRouter);

// Server listening
app.listen(config.PORT, ()=>{ logger.info(`${new Date().toUTCString()} - Server listening on port ${config.PORT}`) })