//Librerías
import fs from 'fs'

const filePath ='../files/products-file.json'

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
        datos.length === 0 ? idCart = 2000 : idCart = datos[datos.length-1].idCart+1;
        const newCart = {products, idCart};
        // Manejo del archivo de Carritos
        if (datos.length === 0) {
            const datos = await fs.promises.writeFile(this.path, JSON.stringify([newCart],null,'\t'));
        } else {
            datos.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(datos,null,'\t'));
        }        
    }

    getCartById = async (id) => {
        // Obtengo informacion del carrito por Id.
        const datos = await this.getCart()
        let searchId = [];
        for (let i=0; i< datos.length; i++) {
            if (datos[i].idCart == id) {
                searchId = datos[i]
            }
        }
        if(searchId) {return searchId} else{ return console.log('Error, no lo encontré :(')}
    }

    addProductToCart = async (idProd, q, cartId)=> {
        const datos = await this.getCart();
        let idFound = false;
        let cartFound = false;
        for (let i=0; i< datos.length; i++) {
            if(datos[i].idCart == cartId){
                for (let j= 0; j< datos[i].products.length; j++) {
                    if (datos[i].products[j].idProduct == idProd) {
                        datos[i].products[j].quantity = datos[i].products[j].quantity + q;
                        await fs.promises.writeFile(this.path, JSON.stringify(datos,null,'\t'));
                        !idFound;
                        return !cartFound;
                    }
                }
                if (!idFound){
                    datos[i].products.push({"idProduct":idProd, "quantity": q});
                    await fs.promises.writeFile(this.path, JSON.stringify(datos,null,'\t'));
                    return !cartFound;
                }
            }
        }
        return cartFound;
    }

}

