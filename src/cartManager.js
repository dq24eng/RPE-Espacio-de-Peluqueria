//Librerías
import fs from 'fs'
import ProductManager from './productManager.js';

const filePath ='../files/products-file.json'
const manejadorProductos = new ProductManager (filePath);

export default class CartManager {
    constructor (path) {
        this.path = path;
    }

    getCart = async() => {
        // Devuelve la información del Carrito
        if (fs.existsSync(this.path)){
            const datos = await fs.promises.readFile(this.path, 'utf-8');
            const cart = JSON.parse(datos);
            return cart;
        } else {
            return [];
        }
    }

    addCart = async(products) => {
        const datos = await this.getCart();
        let idCart = 0;
        datos.length === 0 ? idCart = 2000 : idCart = datos[datos.length-1].id+1;
        const newCart = {products, idCart};
        // Manejo del archivo de Carritos
        if (datos.length === 0) {
            const datos = await fs.promises.writeFile(this.path, JSON.stringify([newProduct],null,'\t'));
        } else {
            datos.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(datos,null,'\t'));
        }        
    }

    getCartById = async (id) => {
        // Obtengo informacion del carrito por Id.
        const datos = await this.getCart()
        let searchId = [];
        for (let i=0; i< this.products.length; i++) {
            if (datos[i].id == id) {
                searchId = datos[i]
            }
        }
        if(searchId) {return searchId} else{ console.log('Error, no lo encontré :(')}
    }

    /*
    addProduct = async(title, description, price, thumbnail, code, stock, status=true, category) => {
        // Esta función agrega un producto al arreglo de products y los almacena en el archivo 

        // Validaciones
        title.length == 0 ? console.log("Por favor, complete el campo Título") : "";
        description.length == 0 ? console.log("Por favor, complete el campo Descripción") : "";
        (price == 0)||(price.length == 0) ? console.log("Por favor, complete el campo Precio") : "";
        isNaN(price) ? console.log("Por favor, ingrese un Precio válido") : "";
        thumbnail.length == 0 ? console.log("Por favor, complete el campo Ruta de imagen") : "";
        code.length == 0 ? console.log("Por favor, complete el campo Código producto") : "";
        (stock == 0)||(stock.length == 0) ? console.log("Por favor, complete el campo Stock") : "";
        isNaN(stock) ? console.log("Por favor, ingrese un Stock de producto válido") : "";

        // Lectura de archivo y creación de objeto con el nuevo producto
        const datos = await this.getProducts();
        datos.forEach(e=>{e.code == code ? console.log("Error: El código de producto ya existe") : ""; })
        let id = 0;
        datos.length === 0 ? id = 1000 : id = datos[datos.length-1].id+1;
        const newProduct = {title, description, price, thumbnail, code, stock, status, category, id};

        // Manejo del archivo de Productos 
        if (datos.length === 0) {
            const datos = await fs.promises.writeFile(this.path, JSON.stringify([newProduct],null,'\t'));
        } else {
            datos.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(datos,null,'\t'));
        }
    } 

    getProductsById = async (id) => {
        // Obtengo informacion del producto por Id.
        this.products = await this.getProducts()
        //const searchId = this.products.find(product => {console.log(id)})
        let searchId = [];
        for (let i=0; i< this.products.length; i++) {
            if (this.products[i].id == id) {
                searchId = this.products[i]
            }
        }
        if(searchId) {return searchId} else{ console.log('Error, no lo encontré :(')}
    }

    updateProduct = async(id, updProduct) => {
        // Actualiza productos en base al Id que recibe
        // La variable updProduct es un objeto que contiene el campo (key) y valor (value) a actualizar 
        const product = await this.getProductsById(id)
        for (let i = 0; i < Object.keys(updProduct).length; i++) {
            for (let j = 0; j < Object.keys(product).length; j++) {
                if (Object.keys(updProduct)[i] == Object.keys(product)[j]){
                    product[Object.keys(product)[j]] = updProduct[Object.keys(updProduct)[i]];
                }
            }
        }
        const datos = await this.getProducts();
        const searchId = datos.findIndex(e=>e.id===product.id);
        datos[searchId] = product;
        await fs.promises.writeFile(this.path, JSON.stringify(datos,null,'\t'));
    }

    deleteProduct = async(idProduct) => {
        const product = await this.getProductsById(idProduct)
        const datos = await this.getProducts();
        const res = datos.filter (del => del.id != product.id)
        await fs.promises.writeFile(this.path, JSON.stringify(res,null,'\t'));
    }*/

}

