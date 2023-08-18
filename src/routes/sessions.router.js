import { Router } from "express";
import userModel from "../dao/models/Users.model.js";
import { createHash, isValidPassword, authToken, generateToken } from "../utils.js";
import passport from "passport";
import auth from "../middlewares/auth.middleware.js";
import passportControl from "../middlewares/passport.controller.js";

const router = Router();
const authMiddleware = [ passportControl('jwt'), auth('user') ]

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
*/
/*

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
    const {email, password} = req.body;
    if(!req.user) return res.status(400).send({status: "error", error: "Incorrect password"})
    req.session.user = {
        first_name: req.user.first_name, 
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.send({status: "success", message:"Successfull login"}) 
})

router.get('/failLogin', async (req, res) => {
    console.log("Failed Strategy")
    res.send({error: "failed"})
})

router.post('/loginjwt',passport.authenticate('login', {failureRedirect: '/failLogin'}), async(req,res)=>{
    const {email,password} = req.body;
    //console.log(email+"  "+password)
    const user =await userModel.findOne({email});
    console.log(user)
    if(!user) return res.status(400).send({status:"error",error:"Invalid credentials"});
    req.session.user=user;
    const access_token = generateToken(user);
    req.headers.authorization = access_token;
    res.send({status:"success", access_token});
})

router.post('/registerjwt',async (req,res)=>{
    const { first_name,last_name,email, age, password} = req.body;
    const exists = await userModel.findOne({email});
    if(exists) return res.status(400).send({status:"error",error:"User already exists"});
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }
    //users.push(user);
    let result = await userModel.create(user);
    const access_token = generateToken(user);
    res.send({status:"success",access_token});

})

router.post('/loginjwt2', async (req,res)=>{
    const {email,password} = req.body;
    const user =await userModel.findOne({email});
    if(!user) return res.send({message: "User not found"})
    /*
    if (user) {
        //console.log("Login jwt2:")
        //console.log(user)
        req.session.user = {"email": user.email, "role": user.role};
        //console.log(req.session.user)
        const access_token = generateToken({email});
        //req.headers.authorization = access_token;
        res.cookie("CoderCookie", access_token, {
            maxAge: 60*60*1000,
            httpOnly: true 
        })//.send({token: access_token})
        res.json({payload: "OK"}) //Entrega los datos de acceso 
    }
    */
    req.session.user = {"email": user.email, "role": user.role};
    //console.log(req.session.user)
    const access_token = generateToken({email});
    //req.headers.authorization = access_token;
    res.cookie("CoderCookie", access_token, {
        maxAge: 60*60*1000,
        httpOnly: true 
    })//.send({token: access_token})
    res.json({payload: "OK"}) //Entrega los datos de acceso 
})

// HACER REGISTER CON JWT 

router.get('/current',authMiddleware,(req,res)=>{
    //res.render("profile", {user: req.session.user});
    res.send(req.session.user);
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