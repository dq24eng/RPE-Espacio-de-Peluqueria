import {UsersRepository} from "../models/repositories/repository.js"; 

class userController {
    async updateRole (req, res) {
        try {
            const userId = req.params.uid;
            const newRole = req.params.role;
            const response = await UsersRepository.updateRole(userId, newRole); 
            res.status(201).json({products: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async getUsers (req, res) {
        try {
            const response = await UsersRepository.getUsers(); 
            res.status(201).json({users: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
    async createUser (req, res) {
        try {
            const data = req.body;
            const response = await UsersRepository.createUser(data); 
            res.status(201).json({users: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async deleteExpiredUsers(req, res) {
        try {
            const user = req.session.user; // Usuario loggeado
            if (!user) return res.redirect('/'); 
            if (user.role == "admin") { 
                const users = await UsersRepository.getFullUsers(); 
                await UsersRepository.delExpUsers(users);
                res.status(201).json({status: "deleted"})
            } else {    // User or Premium role
                res.status(401).json({error: "You cannot delete users", status: "failed"})
            }
            
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

    async deleteUser(req, res) {
        try {
            const user = req.session.user; // Usuario loggeado
            const id = req.params.uid;
            if (!user) return res.redirect('/'); 
            if (user.role == "admin") { 
                await UsersRepository.deleteUser(id);
                res.status(201).json({status: "deleted"})
            } else {    // User or Premium role
                res.status(401).json({error: "You cannot delete users", status: "failed"})
            }
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }

}

export default new userController();

