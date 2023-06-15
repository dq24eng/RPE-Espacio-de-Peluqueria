import { Router } from "express";
import ProductManager from '../cartManager.js';

const router=Router();
const filePath ='../files/carrito.json'
const manejadorCarrito = new ProductManager (filePath);

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

export default router;