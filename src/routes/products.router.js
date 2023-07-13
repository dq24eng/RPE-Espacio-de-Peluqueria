import { Router } from "express";
import ProductManager from '../dao/fileManagers/productManager.js';          // FILE SYSTEM
import Products from "../dao/dbManagers/products.js";       // MONGO DB

const router=Router();
const filePath ='../files/products-file.json'
const manejadorProductos = new ProductManager (filePath);   // FILE SYSTEM 
const prodManager = new Products;                           // MONGO DB

/*

// FILE SYSTEM 

router.get('/', async (req, res)=>{
    const productos = await manejadorProductos.getProducts();
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

router.post ('/', async (req, res)=> {
    try{
        let product = req.body;//Todo los que nos llega del cliente lo almacenamos en esta variable 
        await manejadorProductos.addProduct(product.title, product.description, product.price,
            product.thumbnail, product.code, product.stock, product.status, product.category); 
            // (title, description, price, thumbnail, code, stock, status=true, category)
        res.send({status:"sucess",message: "Producto añadido"})
    } catch (err) {
        return res.status(400).send({status:"error",error:"Error al agregar el producto"})
    }
})

router.put ('/:pid', async (req, res)=> {
    try {let product = req.body; //Tomamos los parametros que llegan en el body de PUT
    let idProd = parseInt(req.params.pid);
    await manejadorProductos.updateProduct(idProd, product);
    res.send({status:"sucess",message:"El producto fue actualizado"})
    } catch (error) {
        return res.status(400).send({status:"error",error:"El producto no existe"})}
});

router.delete ('/:pid', async (req, res)=> {
    let idProd = parseInt(req.params.pid);
    await manejadorProductos.deleteProduct(idProd);
    res.send({status:"sucess",message:"El producto fue eliminado"})
});

*/

/*
// MULTER
router.post ('/', uploader.single('file'),async function(req, res) {
    if(!req.file){
        return res.status(400).send({status:"Error", error:"No se guardo la imagen"})
    }
    let product = req.body;
    product.profile = req.file.path;
    await manejadorProductos.addProduct(product.title, product.description, product.price,
        product.thumbnail, product.code, product.stock, (product.status == "true" ? true:false), product.category); 
        // (title, description, price, thumbnail, code, stock, status=true, category)
    res.send({status:"Ok", message:"Producto creado"})
})
*/

// MONGODB

router.get ('/', async(req, res)=> {
    let products = await prodManager.getAll();
    if(!products) return res.status(500).status({status:"error", error:"No se pudo obtener los datos "});
    res.send({status:"success", playload: products});
})

router.post('/', async(req, res)=> {
    let {title, description, price, thumbnail, code, stock, status, category} = req.body;
    let result = await prodManager.createProduct({
        title, description, price, thumbnail, code, stock, status, category
    })
    res.send({status:"success", playload: result})
})

export default router;