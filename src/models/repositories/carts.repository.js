class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getCarts() {
        return await this.dao.getCartsDAO();
    }

    async getCart(id) {
        return await this.dao.getCartDAO(id);
    }

    async getCartPurchase(id, user) {
        return await this.dao.getCartPurchaseDAO(id, user);
    }
}

export default CartsRepository;