import { Router } from "express";
import ProductManager from '../dao/fileManagers/cartManager.js';             // FILE SYSTEM
import Carts from "../dao/dbManagers/carts.js";                             // MONGO DB
import { cartModel } from "../dao/models/carts.js";

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


/*

router.get ('/', async(req, res)=> {
    let carts = await cartManager.getCart();
    if(!carts) return res.status(500).status({status:"error", error:"No se pudo obtener los datos "});
    res.send({status:"success", playload: carts});
})

*/

// Consultar carritos

router.get('/', async(req, res)=> {
    const result = await cartModel.find();
    res.send({ status: "success", payload: result });
})

// Consultar un carrito específico 

router.get('/:cid', async(req, res)=> {
    let result = await cartModel.findById(req.params.cid).populate('products._id');
    res.send({ status: "success", payload: result });
})

// Agregar carrito

router.post('/', async(req, res)=> {
    /*
    let products = req.body[0].products;
    let quantities = req.body[0].quantities;
    let result = await cartManager.addCart(products, quantities)
    res.send({status:"success", playload: result})
    */
    let products = req.body;
    let result = await cartModel.create(products)
    res.send({ status: "success", payload: result });
})

// Eliminar un producto de un determinado carrito 

router.delete('/:cid/products/:pid', async(req, res) => {
    let cart = await cartModel.findOne({_id:req.params.cid}) 
    await cartModel.findByIdAndUpdate(req.params.cid, {$pull: {products: {_id: req.params.pid}}})
    const result = await cartModel.find();
    res.send({ status: "success", message: `Se eliminó el producto ${req.params.pid}`, payload: result }); 
})

// Actualizar lista de productos en un carrito

router.put('/:cid', async(req, res) => {
    let newListProd = req.body;
    await cartModel.findByIdAndUpdate(req.params.cid, {$unset: {products: 1}})
    await cartModel.findByIdAndUpdate(req.params.cid, {$push: {products: newListProd.products}})
    const result = await cartModel.find();
    res.send({ status: "success", message: 'Se actualizó la lista de productos', payload: result }); 
    
})

// Actualizar cantidad de un producto en un carrito

router.put('/:cid/products/:pid', async(req, res) => {
    let cartId = req.params.cid;
    let prodId = req.params.pid;
    let newQty = req.body.quantity;
    await cartModel.findByIdAndUpdate(cartId, {$pull: {products: {_id: prodId}}})
    await cartModel.findByIdAndUpdate(cartId, {$push: {products: {_id: prodId, quantity: newQty}}})
    const result = await cartModel.find();
    res.send({ status: "success", message: `Se actualizó la cantidad del producto ${prodId}`, payload: result }); 
})

// Eliminar todos los productos de un carrito 

router.delete('/:cid', async(req, res) => {
    await cartModel.findByIdAndUpdate(req.params.cid, {$unset: {products: 1}})
    const result = await cartModel.find();
    res.send({ status: "success", message: 'Se eliminaron los productos del carrito', payload: result }); 
})

export default router;

