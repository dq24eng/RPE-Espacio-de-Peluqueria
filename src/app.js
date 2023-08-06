//Librerías
import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { Server } from "socket.io";
import 'dotenv/config';

import ProductManager from "./dao/fileManagers/productManager.js";
import MessagesManager from "./dao/dbManagers/messages.js"

import viewRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import messagesRouter from './routes/messages.router.js';
import sessionRouter from './routes/sessions.router.js';

import initializedPassport from "./config/passport.config.js";
import passport from "passport";

//Variables
const PORT = 8080; // Puerto
const app = express(); // Variable que se encarga de acceder a todas las condiciones 
const filePath ='../files/products-file.json';
const manejadorProductos = new ProductManager (filePath);
const messMng = new MessagesManager;
let messages=[]; // Mensajes de chat
let usuarios=0; // Cantidad de usuarios conectados 

// Servidor 
const httpServer = app.listen(PORT,()=>console.log("Server listening"));
const socketServer = new Server(httpServer); // Cada vez que se levanta el servidor lo hace como un socket 
export default socketServer;

// Middlewares   -> Operaciones que se ejecutan de manera intermedia entre la petición del cliente y el servicio de nuestro servidor. 

app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(session({
    store: MongoStore.create({
        //mongoUrl:"mongodb+srv://dario240494:IwPwUUKQ664uucqU@ecommercedb.8mcyypf.mongodb.net/?retryWrites=true&w=majority",
        mongoUrl:`mongodb+srv://${process.env.USER_CREDENTIAL}:${process.env.SECRET_KEY_DB}@${process.env.DATABASE_NAME}.8mcyypf.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions:{ useNewUrlParser:true, useUnifiedTopology:true},
        ttl:3600
    }),
    secret:process.env.SECRET_KEY_SESSION,
    resave:false,
    saveUninitialized:false
}));

//Passport 
initializedPassport();
app.use(passport.initialize());
app.use(passport.session());

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/', viewRouter)
app.use('/home', viewRouter)

// Socket.io

socketServer.on('connection', async socket =>{
    // Iniciamos conexión
    console.log("Start connection");

    // Evento de emisión de array de productos - Actualización
    const products = await manejadorProductos.getProducts();
    socket.emit ("products", products);

    // ChatBox
    socket.on('message', async data=> {
        messages.push(data);
        socketServer.emit('messageLogs', messages)
        await messMng.saveMessages(messages)
        //console.log(data);
    })

    socket.on('authenticated', data => {
        usuarios++;
        socket.broadcast.emit('newUserConnected', usuarios + " usuarios conectados")
    })
})

//MongoDB

//mongoose.set('strictQuery', false)
const config = {
    mongoDB: {
        URL: `mongodb+srv://${process.env.USER_CREDENTIAL}:${process.env.SECRET_KEY_DB}@${process.env.DATABASE_NAME}.8mcyypf.mongodb.net/?retryWrites=true&w=majority`,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
        console.log("Connected to Mongo Atlas");
    } catch (error) {
        console.log("Error en la conexión con Mongo Atlas", error);
    }
};

connectMongoDB();
app.use(express.json()) //Para que el navegador interprete el llamado de los APIs
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/chat', messagesRouter);
app.use('/api/sessions', sessionRouter);




