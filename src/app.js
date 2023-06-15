//Librerías
import express from "express";
import productsRouter from './routes/products.router.js'
import __dirname from './utils.js'
import cartRouter from './routes/products.cart.js'

//Variables
const app = express(); // Variable que se encarga de acceder a todas las condiciones 

// Servidor 
app.listen(8080,()=>console.log("Server listening"));
app.use(express.json()) //Para que el navegador interprete el llamado de los APIs
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

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


