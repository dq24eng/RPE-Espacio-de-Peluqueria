//Librerías 
import express from "express"
import ProductManager from "../dao/fileManagers/productManager.js"
import socketServer from "../app.js";
import { productModel } from "../dao/models/products.js";
import userModel from "../dao/models/Users.model.js";

// Variables 
const router = express.Router();
const filePath ='../files/products-file.json';
const manejadorProductos = new ProductManager (filePath);

/*
router.get('/home', (req, res) => {
    res.render("home")
});
*/

router.get ('/', async (req, res)=> {
    const productos = await manejadorProductos.getProducts();
    // User loggeado en la session actual
    const user = req.session.user;
    if(!req.session.user) {
        res.render("login")
    } else {
    res.render('home', {
        style: 'index.css',
        isThereProducts: productos.length >= 0, 
        productos,
        user
    })}
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

/*
// ChatBox
router.get ('/chat', async (req, res)=> {
    res.render('chat', {
        style: 'index.css'
    })
})
*/

router.get ('/products', async(req, res) => {

    // Variables query
    let {page=1, limit=10, query , sort} = req.query;
    // User loggeado en la session actual
    const user = await userModel.findOne({ _id: req.session.passport.user });
    //console.log(user)
    // Variables sin filtrar que se reciben del método get
    const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages} = 
        await productModel.paginate({}, {limit, page, lean: true});
    const products = docs;
    // Variable filtrada por categoría que se puede recibir del método get
    const prodFiltrados = await productModel.paginate({category: query}, {limit, page, lean: true})

    // Ordenación sort 
    if(sort == 'asc') {
        prodFiltrados.docs.sort(((a,b) => a.price - b.price));  // Ordenamiento de menor a mayor por precio
        products.sort(((a,b) => a.price - b.price));
    } else if (sort == 'desc') {
        prodFiltrados.docs.sort(((a,b) => b.price - a.price));  // Ordenamiento de mayor a menor por precio
        products.sort(((a,b) => b.price - a.price));
    }

    try {
        // Corroboramos si el usuario está loggeado
        if(!req.session.passport.user) {
            res.render("login") // Enviamos el usuario a la pagina de Login no está loggeado 
        } else {
            if (prodFiltrados.docs.length > 0) { // Pagina products con filtro aplicado 
                return res.render('products', {
                    status: "success",
                    playload: prodFiltrados.docs,  // <- Datos filtrados por categoría 
                    totalPages: prodFiltrados.totalPages,
                    hasPrevPage: prodFiltrados.hasPrevPage,
                    hasNextPage: prodFiltrados.hasNextPage,
                    prevPage: prodFiltrados.prevPage,
                    nextPage: prodFiltrados.nextPage,
                    page,
                    limit,
                    query,
                    sort,
                    first_name: user.first_name,
                    role: user.role
                });
            } else { // Pagina que muestra todos los productos 
                return res.render('products', {
                    status: "success",
                    playload: products, 
                    totalPages: totalPages,
                    hasPrevPage: hasPrevPage,
                    hasNextPage: hasNextPage,
                    prevPage: prevPage,
                    nextPage: nextPage,
                    page,
                    limit,
                    query,
                    sort,
                    first_name: user.first_name,
                    role: user.role
                });
            }   
        }
    } catch (err) {
        return res.send({ error: err.message });
    }

});

//-------------------------------------------------------------------------------
// ESTA FUNCION PROVOCA QUE SE CUELGUE EL PROGRAMA, REVISAR!!!
//-------------------------------------------------------------------------------
router.get ('/products/:pid', async(req, res) => {
    //console.log(req.params.pid)
    const product = await productModel.findById(req.params.pid).lean(); 
    //console.log(product)
    //return res.render('product', {product: product});
    try {
        res.render('product', {product});
    } catch (err) {
        return res.send({ error: err.message });
    }
    //return res.send({status:"success", playload: product})
})
//-------------------------------------------------------------------------------

router.get('/register', (req, res) => {
    res.render("register")
})

// CREAR VISTA FAILREGISTER
router.get('/failRegister', (req, res) => {
    res.render("failRegister")
});

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/restart', (req, res) => {
    res.render("restart")
})

/*
router.get('/', (req, res) => {
    //Una vez logeado se debe acceder al perfil con los datos del usuario
    res.render("products", {
        user: req.session.user // Muestra los datos del profile -> nombre, email y edad 
    });
});
*/

export default router;
