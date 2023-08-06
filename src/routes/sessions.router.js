import { Router } from "express";
import userModel from "../dao/models/Users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

/*
router.post('/register',async(req,res)=>{

    const { first_name,last_name,email, age, password} = req.body;
    const exist =await userModel.findOne({email});

    //Status error usario existente 
    if(exist) return res.status(400).send({status:"error",error:"Users already exists"});

    const user={first_name,last_name, email,age, password};
    let result = await userModel.create(user);
    res.send({status:"success",message:"User registered"})
    
})
*/

router.post ('/register', passport.authenticate('register', {failureRedirect:'/failRegister'}),async (req, res) => {
    res.send({status:"success", message:"User Register"})
})

router.get('/failRegister', async(req, res)=> {
    res.send({error:"fail register, try again"})
})

/*
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


router.post('/login',async(req,res)=>{

    const {email, password} = req.body;
    if (!email || !password) return res.status(400).send({status:"error", error:"Error user"});

    const user = await userModel.findOne({email: email}, {email: 1, first_name:1, last_name:1,password:1});
    if(!user) return res.status(400).send({status:"error", error:"Error user"});

    if(!isValidPassword(user, password)) return res.status(403).send({status:"error", error:"Credential error"});
    req.session.user = user;
    res.send({status: "sucess", payload: user})

})
*/

router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), async(req, res) => {
    res.send({status: "success", message:"Successfull login"}) 
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

router.post('/restart',async(req,res)=> {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).send({status:"error", error:"Incomplete Values"});

    const user = await userModel.findOne({email});
    if(!user) return res.status(404).send({status:"error", error:"User not found"});
    const newHashedPass = createHash(password);
    await userModel.updateOne({_id:user._id}, {$set:{password:newHashedPass}});

    res.send({status: "sucess", message: "Contraseña restaurada"});
})

router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res ) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async (req, res ) => {
    req.session.user = req.user;
    res.redirect('/products')
})


export default router;