//Librerías 
import express from "express"

// Variables 
const router = express.Router();

// ChatBox
router.get ('/', async (req, res)=> {
    res.render('chat', {
        style: 'index.css'
    })
    /*
    let messages = messManager.getAll();
    if(!messages) return res.status(500).status({status:"error", error:"No se pudo obtener los datos "});
    res.send({status:"success", playload: messages});
    */
})

export default router;