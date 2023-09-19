import viewsService from "../services/views.service.js";

class viewsController {
    async getProductsView(req, res) {
        try {
            if (!req.session.user) return res.redirect('/login');
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

    async getProductView(req, res) {
        const id= req.params.pid;
        try {
            const product = await viewsService.getProduct(id); 
            res.render('product', product[0]);
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getLoginView(req, res) {
        //if (req.session.user) return res.redirect('/');
        console.log(req.session.user)
        try {
            res.render('login')
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getRegisterView(req, res) {
        if (req.session.user) return res.redirect('/');
        console.log(req.session.user)
        try {
            res.render('register')
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async home(req, res) {
        try {
            req.logger.warn("Warning")
            res.render('home', {user: req.session.user})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new viewsController();