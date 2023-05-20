class ProductManager {                 
    constructor () {
        this.products = [];
    }

    getProducts = () => {
        // Devuelve la base de datos de productos 
        return this.products;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        // Esta función agrega un producto al arreglo de products creado en el constructor 
        // Creación id Product que será auto-incrementable
        let id = 0;
        this.products.length === 0 ? id = 1000 : id = this.products[this.products.length-1].id+1; 
        // Validaciones
        title.length == 0 ? console.log("Por favor, complete el campo Título") : "";
        description.length == 0 ? console.log("Por favor, complete el campo Descripción") : "";
        (price == 0)||(price.length == 0) ? console.log("Por favor, complete el campo Precio") : "";
        isNaN(price) ? console.log("Por favor, ingrese un Precio válido") : "";
        thumbnail.length == 0 ? console.log("Por favor, complete el campo Ruta de imagen") : "";
        code.length == 0 ? console.log("Por favor, complete el campo Código producto") : "";
        (stock == 0)||(stock.length == 0) ? console.log("Por favor, complete el campo Stock") : "";
        isNaN(stock) ? console.log("Por favor, ingrese un Stock de producto válido") : "";
        this.products.forEach(e=>{e.code == code ? console.log("Error: El código de producto ya existe") : ""; })
        // Definición de nuevo producto 
        const newProduct = {title, description, price, thumbnail, code, stock, id};
        this.products.push(newProduct); 
    }

    getProductsById = (idProduct) => {
        // Obtengo informacion del producto por Id.
        const searchId = this.products.findIndex(e=>e.id===idProduct)
        searchId === -1 ? console.log("Not found") : console.log(this.products[searchId])
    }

}

const manejadorProductos = new ProductManager ();
manejadorProductos.addProduct("Shampoo PRIMONT Cell 410mg", "Rejuvenece fibra del cabello", 2500,  "./img/shpri410.jpg", "PRC410", 4 );
manejadorProductos.addProduct("Tratamiento Hialu C 410mg", "Con ácido hialuronico", 2600,  "./img/hialuc410.jpg", "TRH410", 2 );
manejadorProductos.addProduct("Color Plex 250mg", "Bond Mainteinance", 1900, "./img/coplex250.jpg", "COP250", 10 );
manejadorProductos.getProducts();
manejadorProductos.getProductsById(1002);



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

    *** Creación de Id aleatorio alfanumérico y validación ***
    let id = Math.random().toString(36).substring(2,12);
    this.products.forEach(e=>{e.id == id ? id = Math.random().toString(36).substring(2,12) : "";})

*/


