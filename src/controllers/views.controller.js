import viewsService from "../services/views.service.js";

class viewsController {
    async getProductsView(req, res) {
        try {
            let {page=1, limit=10, query , sort} = req.query;
            const {products, pages} = await viewsService.getProducts(page, limit, query, sort)
            return res.render('products', {
                status: "success",
                playload: products, 
                totalPages: pages.totalPages,
                hasPrevPage: pages.hasPrevPage,
                hasNextPage: pages.hasNextPage,
                prevPage: pages.prevPage,
                nextPage: pages.nextPage,
                page,
                limit,
                query,
                sort,
                //first_name: user.first_name,
                //role: user.role
            });
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new viewsController();