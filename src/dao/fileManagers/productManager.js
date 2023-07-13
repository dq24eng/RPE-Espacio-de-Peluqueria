//Librerías
import fs from 'fs'

export default class ProductManager {
    constructor (path) {
        this.path = path;
    }

    getProducts = async() => {
        // Devuelve la base de datos de productos 
        if (fs.existsSync(this.path)){
            const datos = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(datos)
            return products
        } else {
            return []
        }
    }

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
    }

}

// N  O  T  A  S
// ----------------------------------------
//          Constructor
// ----------------------------------------
/*
    this.title = title;                 //Nombre del producto
    this.description = description;     //Descripcion del producto
    this.price = price;                 //Precio del producto
    this.thumbnail = thumbnail;         //Ruta imagen producto
    this.code = code;                   //Codigo identificador producto
    this.stock = stock;                 // Número de piezas disponibles
    this.path = path;                   // Ruta del archivo que contiene los productos 

    *** Creación de Id aleatorio alfanumérico y validación ***
    let id = Math.random().toString(36).substring(2,12);
    this.products.forEach(e=>{e.id == id ? id = Math.random().toString(36).substring(2,12) : "";})

*/
