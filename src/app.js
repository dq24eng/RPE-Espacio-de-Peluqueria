//Librerías
import express from "express";
import productsRouter from './routes/products.router.js'
import __dirname from './utils.js'

//Variables
const app = express(); // Variable que se encarga de acceder a todas las condiciones 

// Servidor 
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use('/api/products', productsRouter);

app.listen(8080,()=>console.log("Server listening"));

/*const agregarProducto = async () => {
    await manejadorProductos.addProduct("Nutricion Reparadora PRIMONT 20mg", "Primont Nutri Reparadora Tratamiento Capilar Monodosis",650,"./img/nutri20.jpg","NUTR20",24)
    await manejadorProductos.addProduct("Bio Balance Crema Peinar Vegana 250mg", "Base a elementos naturales de origen vegetal",1680,"./img/bio250.jpg","BIO250",2)
    //await manejadorProductos.addProduct("Tratamiento Hialu C 410mg", "Con ácido hialuronico",2650,"./img/hialuc410.jpg","TRH410",2)
}
agregarProducto();*/

// manejadorProductos.getProducts();
// manejadorProductos.getProductsById(1002);
// manejadorProductos.updateProduct(1000, {"price":1700, "code": "TRL715"});
// manejadorProductos.deleteProduct(1000);


