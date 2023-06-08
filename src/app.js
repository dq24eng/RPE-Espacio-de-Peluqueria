//Librerías
import ProductManager from './productManager.js';
import express from "express";

//Variables
const filePath ='../files/products-file.json'
const manejadorProductos = new ProductManager (filePath);
const app = express(); // Variable que se encarga de acceder a todas las condiciones 

// Servidor 
app.use(express.urlencoded({extended:true}))
app.get('/products', async (req, res)=>{
    const productos = await manejadorProductos.getProducts();
    let limite = req.query.limit;
    let productosFiltrados = [];
    if(limite>0) {
        for (let index = 0; index < limite; index++) {
            productosFiltrados.push(productos[index]);            
        }
        res.send(productosFiltrados);
    } else {res.send (productos);}
})
app.get('/products/:pid', async (req, res)=> {
    const productos = await manejadorProductos.getProducts();
    let idProduct = req.params.pid;
    let producto = productos.find(p => p.id==idProduct);
    if(!producto) return res.send({error: "Producto no encontrado"});
    res.send(producto);
})
app.listen(8080,()=>console.log("Server listening"))


/*const agregarProducto = async () => {
    await manejadorProductos.addProduct("Shampoo PRIMONT Cell 410mg", "Rejuvenece fibra del cabello",2500,"./img/shpri410.jpg","PRC410",4)
    await manejadorProductos.addProduct("Color Plex 250mg", "Bond Mainteinance",1900,"./img/coplex250.jpg","COP250",10)
    await manejadorProductos.addProduct("Tratamiento Hialu C 410mg", "Con ácido hialuronico",2650,"./img/hialuc410.jpg","TRH410",2)
}
agregarProducto();*/

// manejadorProductos.getProducts();
// manejadorProductos.getProductsById(1002);
// manejadorProductos.updateProduct(1000, {"price":1700, "code": "TRL715"});
// manejadorProductos.deleteProduct(1000);


