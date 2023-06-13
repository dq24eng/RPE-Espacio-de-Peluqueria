import { Router } from "express";
import ProductManager from '../productManager.js';

const router=Router();
const filePath ='../files/products-file.json'
const manejadorProductos = new ProductManager (filePath);

router.get('/', async (req, res)=>{
    const productos = await manejadorProductos.getProducts();
    console.log(productos)
    let limite = req.query.limit;
    
    let productosFiltrados = [];
    if(limite>0) {
        for (let index = 0; index < limite; index++) {
            productosFiltrados.push(productos[index]);            
        }
        res.send({productosFiltrados});
    } else {res.send ({productos});}
})

router.get('/:pid', async (req, res)=> {
    const productos = await manejadorProductos.getProducts();
    let idProduct = req.params.pid;
    let producto = productos.find(p => p.id==idProduct);
    if(!producto) return res.send({error: "Producto no encontrado"});
    res.send({producto});
})

export default router;