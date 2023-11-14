import viewsService from "../services/views.service.js";
import userModel from "../models/dao/mongo/model/users.model.js";
import logger from "../utils/logger.utils.js";
import { UsersRepository } from "../models/repositories/repository.js";

class viewsController {
    async getProductsView(req, res) {
        try {
            let cookies = req.signedCookies["restartPassCookie"];
            console.log(cookies)
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
        //console.log(req.session.user)
        try {
            res.render('login')
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getRegisterView(req, res) {
        if (req.session.user) return res.redirect('/');
        //console.log(req.session.user)
        try {
            res.render('register')
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async home(req, res) {
        try {
            res.render('home', {user: req.session.user})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getRestartView(req, res) {
        try {
            res.render('restart')
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async restartPass(req, res) {
        try {
            const user = await userModel.findOne({_id: req.params.idUser})
            if (req.signedCookies["restartPassCookie"] && user.restart) { 
                // Entra si verificamos que la cookie existe y el usuario efectivamente solicitó cambio de clave
                res.render('restartPassword')
            } else {
                console.log(`El tiempo expiró, por favor solicite un nuevo link de acceso.`);
                logger.error(`${new Date().toUTCString()} - The link expired, please try again.`)
                res.render('linkExpired')
            }
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async getUpdateRole (req, res) {
        try {
            if (!req.session.user) return res.redirect('/login');
            if (req.session.user.role != "admin") res.render('forbiddenAccess')
            const users = await UsersRepository.getUsers(); 
            console.log(users)
            res.render('updateRole', {data: users});
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new viewsController();