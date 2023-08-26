import productModel from '../dao/models/products.model.js'; 

class productService {
    async getProducts () {
        try {
            const response = await productModel.find();
            return response;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async getProduct (id) {
        try {
            const response = await productModel.find({_id: id});
            return response.length == 0 ? "Product not found" : response
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async createProduct (data) {
        try {
            const response = await productModel.create(data); 
            return response
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async updateProduct (id, data) {
        try {
            await productModel.updateOne({ _id: id }, data);
            const response = await productModel.findById(id);
            return response;
        } catch (error) {
            throw new Error (error.message);
        }
    }

    async deleteProduct (id) {
        try {
            await productModel.deleteOne({ _id: id });
            const response = await productModel.findById(id);
            return response;
        } catch (error) {
            throw new Error (error.message);
        }
    }

}

export default new productService(); 