//Librerías
import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import ProductManager from "./productManager.js";
import MessagesManager from "./dao/dbManagers/messages.js"

import viewRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import messagesRouter from './routes/messages.router.js';

import mongoose from "mongoose";

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

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use('/', viewRouter)

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
        URL: "mongodb+srv://dario240494:IwPwUUKQ664uucqU@ecommercedb.8mcyypf.mongodb.net/?retryWrites=true&w=majority",
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
app.use('/api/cart', cartRouter);
app.use('/chat', messagesRouter);

/*const agregarProducto = async () => {
    // (title, description, price, thumbnail, code, stock, status=true, category)
    await manejadorProductos.addProduct("Nutricion Reparadora PRIMONT 20mg", "Primont Nutri Reparadora Tratamiento Capilar Monodosis",650,["../src/public/img/nutri20.jpg"],"NUTR20",24, true, "Nutriciones")
    await manejadorProductos.addProduct("Bio Balance Crema Peinar Vegana 250mg", "Base a elementos naturales de origen vegetal",1680,["../src/public/img/bio250.jpg"],"BIO250",2, true, "Crema")
    await manejadorProductos.addProduct("Tratamiento Hialu C 410mg", "Con ácido hialuronico",2650,["../src/public/img/hialuc410.jpg"],"TRH410",2, true, "Tratamientos")
    await manejadorProductos.addProduct("Primont Color Kit + Oxidantes", "Aporta suavidad, brillo, resistencia y cobertura al cabello.",1960,["../src/public/img/colox67.jpg"],"KITCOX",12, true, "Color-Tinturas")
    await manejadorProductos.addProduct("Aceite Argan Tratamiento Capilar 60ml", "Oil Sérum Primont Maroc Oil",2200,["../src/public/img/acei060.jpg"],"ACE060",23, true, "Tratamientos")
}

agregarProducto();*/

// manejadorProductos.getProducts();
// manejadorProductos.getProductsById(1002);
// manejadorProductos.updateProduct(1000, {"price":1700, "code": "TRL715"});
// manejadorProductos.deleteProduct(1000);


