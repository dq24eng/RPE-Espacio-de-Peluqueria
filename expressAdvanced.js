import express from "express";

const app=express(); //Con app trabajamos con todos los metodos y modulos de Express
const server=app.listen(8080,()=>console.log("Server listening"))
app.use(express.json()) //Para que el navegador interprete el llamado de los APIs
app.use(express.urlencoded({extended:true})) 

let users=[];

app.post('/api/user', (req, res)=>{
    let user=req.body;//Todo los que nos llega del cliente lo almacenamos en esta variable 
    if(!user.first_name || !user.last_name){ // Validamos si la información llega completa 
        return res.status(400).send({status:"Error", error: "Información incompleta"})
    } 
    users.push(user);
    res.send({status:"sucess", message: "Usuario fue creado satisfactoriamente"})
})

app.get('/api/user',(req,res)=>{
    res.send({users});
})

app.put('/api/user/:name',(req,res) =>{
    let newUser =req.body;
    let name=req.params.name;
    for (let index = 0; index < users.length; index++) {
        if(users[index].first_name == name) {
            users[index] = newUser;
        }
    }
    if(!newUser.first_name || !newUser.last_name){
        return res.status(400).send({status:"error",error:"Información no coincide con lo que esta guardado"})
    }
    res.send({status:"sucess",message:"Usuario fue actualizado"})
})

app.delete('/api/user/:name',(req,res)=>{
    let name = req.params.name;
    let cant_caracteres = users.length;
    users = users.filter(user => user.first_name!=name)
    if(users.length === cant_caracteres) {
        return res.status(400).send({status:"Error", error: "No lo encontró"})
    }
    res.send({status:"sucess", message: "Usuario fue borrado"});
})