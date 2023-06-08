import express from "express";

const app = express(); 

const usuarios = [
    {id:"1", nombre: "pepe", genero:"M"},
    {id:"2", nombre: "pepita", genero:"F"},
    {id:"3", nombre: "pipin", genero:"M"}
]

app.get('/',(req, res) => {
    res.send(usuarios)
})

app.get('/:idUsuario',(req, res) => {
    let idUsuarioCapturado = req.params.idUsuario;
    let usuariosFiltrados = usuarios.find(u=>u.id === idUsuarioCapturado)
    if(!usuariosFiltrados) return res.send({error:"Usuario no encontrado"})
    res.send({usuariosFiltrados})
})

app.listen(8082,()=>console.log("Server listening"))