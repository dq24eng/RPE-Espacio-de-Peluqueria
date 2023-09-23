const form =document.getElementById('restartFormPass')

form.addEventListener('submit', e =>{
    console.log("Entre aca")
    e.preventDefault();
    const data= new FormData(form);
    const obj={}
    
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/restartPass',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/')
        }
    })
})