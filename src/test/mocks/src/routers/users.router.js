import { generateUser } from "../utils/mock.utils.js";
import {Router} from 'express'

const router = Router(); 

router.get('/', (req, res) => {
    const total = +req.query.total || 500;
    const users = Array.from ({length:total}, ()=> generateUser()); 
    res.json({success: true, payload: users})
})

export default router;