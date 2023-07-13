//Librerías 
import express from "express"
import Messages from "../dao/dbManagers/messages.js";

// Variables 
const router = express.Router();
const messManager = new Messages;

// ChatBox
router.get ('/', async (req, res)=> {
    res.render('chat', {
        style: 'index.css'
    })
})

router.get ('/messages', async (req, res)=> {
    let messages = await messManager.getAll();
    if(!messages) return res.status(500).status({status:"error", error:"No se pudo obtener los datos "});
    res.send({status:"success", playload: messages});
})

export default router;