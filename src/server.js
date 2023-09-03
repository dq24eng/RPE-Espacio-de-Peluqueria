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

// Server 
const app = express(); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(config.PORT, ()=>{console.log("Server listening")} )

// MongoDB

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log("Connected to Mongo Atlas");
    } catch (error) {
        console.log("Failed connection with Mongo Atlas", error);
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
app.use(cookieParser());

// Routes 
app.use('/', viewsRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/cart', cartsRouter.getRouter()); 




