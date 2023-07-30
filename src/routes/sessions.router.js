import { Router } from "express";
import userModel from "../dao/models/Users.model.js";

const router = Router();

router.post('/register',async(req,res)=>{

    const { first_name,last_name,email, age, password} = req.body;
    const exist =await userModel.findOne({email});

    //Status error usario existente 
    if(exist) return res.status(400).send({status:"error",error:"Users already exists"});

    const user={first_name,last_name, email,age, password};
    let result = await userModel.create(user);
    res.send({status:"success",message:"User registered"})

})

router.post('/login',async(req,res)=>{

    const {email,password}=req.body
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status:"error",error:"Incorrect credentials"}) // Aca se podría crear otra vista o enviar un mensaje/alerta (SweetAlert) para mostrar el que no se encontró el usuario
    req.session.user={
        name: `${user.first_name} ${user.last_name}`,
        email:user.email,
        age: user.age,
        role: user.role,
    }
    res.send({status:"success",payload:req.session.user, message:"Usuario creado"})

})

router.get('/logout', (req, res) => {
    try {
		req.session.destroy((error) => {
			if (!error) {
				return res.status(200).render("login");
			} else {
                return res.status(500).send({ status: "Logout failed", payload: error });
            }
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
})

export default router;