import { generateProduct } from '../utils/mock.utils.js';
import {Router} from 'express'

const router = Router(); 

router.get('/', (req, res) => {
    const total = +req.query.total || 100;
    const products = Array.from ({length:total}, ()=> generateProduct()); 
    res.json({success: true, payload: products})
})

export default router;