const form =document.getElementById('loginForm');

console.log("Entre")

form.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const data= new FormData(form);
    const loginPayload = Object.fromEntries(data)
    console.log(loginPayload)
    

    /* // LOGIN SIN PASSPORT AVANZADO
    const obj={}
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }   
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/profile') // Una vez exitoso el login redireccioamos a la pagina products
        }
    })
    */

    // LOGIN CON PASSPORT AVANZADO

    try {
        const response = await fetch('/api/sessions/login', {   //Peticion al back
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(loginPayload)
        });
        const {access_token} = await response.json(); 
        window.localStorage.setItem('token', access_token);
        window.location.href = '/profile'
    } catch (error) {
        console.log(error)
        window.location.href='/';
    }
});