//Librerías 
import express from "express"
import ProductManager from "../productManager.js"
import socketServer from "../app.js";

// Variables 
const router = express.Router();
const filePath ='../files/products-file.json';
const manejadorProductos = new ProductManager (filePath);

router.get ('/', async (req, res)=> {
    const productos = await manejadorProductos.getProducts();
    res.render('home', {
        style: 'index.css',
        isThereProducts: productos.length >= 0, productos
    })
})

router.get('/realtimeproducts', async (req, res)=>{
    res.render('realTimeProducts',{
        style: 'index.css'
    })
})

router.post ('/realtimeproducts', async (req, res)=>{
    let product = req.body;
    await manejadorProductos.addProduct(product.title, product.description, product.price,
        product.thumbnail, product.code, product.stock, product.status, product.category); 
    const getProducts = await manejadorProductos.getProducts();
    socketServer.emit("products", getProducts);
    res.send({status:"sucess",message: "Producto añadido"});
    
})

router.delete ('/realtimeproducts', async (req, res)=> {
    let request = req.body;
    await manejadorProductos.deleteProduct(request.id);
    const delProducts = await manejadorProductos.getProducts();
    socketServer.emit("products", delProducts);
    res.send({status:"sucess",message:"El producto fue eliminado"})
});

export default router;
