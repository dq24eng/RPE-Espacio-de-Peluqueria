import { Router } from "express";
import ProductManager from '../dao/fileManagers/cartManager.js';             // FILE SYSTEM
import Carts from "../dao/dbManagers/carts.js";             // MONGO DB

const router=Router();
const filePath ='../files/carrito.json'
const manejadorCarrito = new ProductManager (filePath);     // FILE SYSTEM
const cartManager = new Carts;                              // MONGO DB

/*

        FILE SYSTEM

router.post ('/', async(req, res)=> {
    try {
        let productsCart = req.body;
        await manejadorCarrito.addCart(productsCart);
        res.send({status:"sucess",message: "Se agregaron los productos al carrito "})
    } catch (err) {
        return res.status(400).send({status:"error",error:"Error al agregar el carrito"})
    }
})

router.get('/:cid', async(req,res)=>{
    const cart = await manejadorCarrito.getCartById(req.params.cid);
    cart.length === 0 ? res.send({error: "Carrito no encontrado"}) : res.send({cart})
})

router.post ('/:cid/product/:pid', async(req,res)=>{
    const cart = await manejadorCarrito.addProductToCart(parseInt(req.params.pid), req.body.q, parseInt(req.params.cid));
    cart ? res.send({message: "Producto añadido al carrito"}) : res.send({error: "Carrito no encontrado"})
})

*/

//      MONGODB

router.get ('/', async(req, res)=> {
    let carts = await cartManager.getCart();
    if(!carts) return res.status(500).status({status:"error", error:"No se pudo obtener los datos "});
    res.send({status:"success", playload: carts});
})

router.post('/', async(req, res)=> {
    let products = req.body[0].products;
    let quantities = req.body[0].quantities;
    let result = await cartManager.addCart(products, quantities)
    res.send({status:"success", playload: result})
})

export default router;

