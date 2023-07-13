const socket=io();

function updateProducts(products) {  // Actualizar lista de productos en tiempo real 
    const ulVariable = document.querySelector("ul");
    ulVariable.innerHTML = '';
    products.forEach(product => {
        ulVariable.innerHTML += `
            <li class="li-products">
                <img src=${product.thumbnail} height="40" width="40" class="img-class-products">
                <span> ${product.title} </span>
            </li>
        `
    });
};

socket.on("products", products => { // Escuchamos la actualizacion de productos 
    updateProducts(products);
});

// ChatBox, Vista Chat

let user; //Identificamos quien se está conectando
let chatBox = document.getElementById("chatBox");

Swal.fire({
    tittle: "Bienvenido!",
    input: "text",
    text: "Por favor, ingrese su correo electrónico: ",
    
    inputValidator: (value)=> {
        if (value.length>0) {
            socket.emit('authenticated', []);
            return !value;
        } else {
            return "Se requiere un nombre para continuar "
        } 
    },
    allowOutsideClick: false
}).then(result => {
    user=result.value
})

chatBox.addEventListener('keyup', event => {
    if(event.key == "Enter") {
        if(chatBox.value.trim().length>0) {
            socket.emit("message", {user:user, message:chatBox.value});
            chatBox.value="";
        }
    }
})

socket.on('messageLogs', data=> {
    let log = document.getElementById('messageLogs');
    let messages="";
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`
    })
    log.innerHTML = messages;
})

socket.on('newUserConnected', data=> {
    Swal.fire({
        text: "Nuevo usuario conectado",
        target: '#custom-target',
        toast: true
    })
})


