import express from "express";

const app = express(); // Variable que se encarga de acceder a todas las condiciones 

/*app.get('/saludo',(req,res)=>{
    res.send("Hola")
})
app.get('/names',(req,res)=>{
    res.send({
        nombre: "Dario",
        apellido: "Quinteros"
    })
})
app.get('/parametros/:nombre',(req,res)=>{
    res.send(`Bienvenido, ${req.params.nombre}`)
})
app.get('/masparametros/:nombre/:apellido',(req,res)=>{
    res.send(`Bienvenido, ${req.params.nombre} ${req.params.apellido}`)
})

app.use(express.urlencoded({extended:true}))
app.get('/rutaQuery', (req, res)=>{
    let consultas = req.query;
    let {nombre, apellido} = req.query;
    res.send(consultas)
    //http://localhost:8081/rutaQuery?nombre=Dario&apellido=Quinteros
})
*/

const usuarios = [
    {id:"1", nombre: "pepe", genero:"M"},
    {id:"2", nombre: "pepita", genero:"F"},
    {id:"3", nombre: "pipin", genero:"M"}
]

app.get('/', (req, res)=>{
    let genero = req.query.genero;
    if (!genero||(genero!=="M"&genero!=="F")) return res.send(usuarios)
    let usuariosFiltrados = usuarios.filter ( usuario => usuario.genero===genero);
    res.send(usuariosFiltrados)
})

/*app.get('/', (req, res)=>{
    let nombre = req.query.nombre;
    if (nombre==="Dario") return res.send("holaaa")
})*/

app.listen(8081,()=>console.log("Server listening"))