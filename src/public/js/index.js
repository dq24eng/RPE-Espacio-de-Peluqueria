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

