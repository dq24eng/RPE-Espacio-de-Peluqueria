import {UsersRepository} from "../models/repositories/repository.js"; 

class userController {
    async updateRole (req, res) {
        try {
            const userId = req.params.uid;
            const response = await UsersRepository.updateRole(userId); 
            res.status(201).json({products: response, status: "success"})
        } catch (error) {
            res.status(400).json({error: error.message, status: "failed"})
        }
    }
}

export default new userController();

