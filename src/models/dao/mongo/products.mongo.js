import productModel from "./model/products.model.js"

export class ProductsMongoDAO{
    constructor() {}

    async getProductsDAO () {
        try {
            const response = await productModel.find();
            if(!response) return "No products found"
            return response;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getProductDAO (id) {
        try {
            const response = await productModel.find({_id: id});
            return response.length == 0 ? "Product not found" : response
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async createProductDAO (data) {
        try {
            const response = await productModel.create(data); 
            return response
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async updateProductDAO (id, data, user) {
        try { 
            const product = await productModel.find({_id: id});
            if (((user.role == "premium")&&(product[0].owner == user.email))||(user.role == "admin")){
                await productModel.updateOne({ _id: id }, data);
                const response = await productModel.findById(id);
                return response;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async deleteProductDAO (id, user) {
        try {
            const product = await productModel.find({_id: id});
            if (((user.role == "premium")&&(product[0].owner == user.email))||(user.role == "admin")){
                await productModel.deleteOne({ _id: id });
                const response = await productModel.findById(id);
                return response;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error (error.message);
        }
    }
}


