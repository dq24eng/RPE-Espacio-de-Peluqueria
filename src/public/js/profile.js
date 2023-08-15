import { response } from "express";

const divElement = document.getElementById('profile-content'); 
const token = window.localStorage.getItem('token')
console.log("token: " + token)

fetch('/api/sessions/current',{
    method:'GET',
    headers:{
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization':`Bearer ${token}` //Obtenemos la info del usuario loggeado 
    }
})
/*
    .then(response=>{
        if(response.status===401){
            window.location.replace('/login')
        } else {
            return response.json();
        }
    }).then(json=>{
        const paragraph = document.getElementById('result');
        paragraph.innerHTML =  `Hola, tus datos son ${json.payload.email} y ${json.payload.password}`
    })
*/
    .then((response) => {
        console.log("La rep es : " + response);
        response.json()
    })
    .then((data) => {
        console.log("Hay data: " + data);
        if(data.error) throw data.error
        const user = data.payload; 
        const html = `<h1> Bienvenido  ${user?.email} `
        divElement.innerHTML=html;
    })
    .catch((error)=> {
        const html = `<h1> Error: ${error} </h1>`;
        divElement.innerHTML=html;
        setTimeout(()=> {
            window.location.href = '/';
            window.localStorage.removeItem('token');
        }, 3000); 
    })

const logout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/';
}