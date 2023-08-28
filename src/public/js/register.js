const form =document.getElementById('registerForm')

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const data= new FormData(form);
    const obj={}
    data.forEach((value,key)=>obj[key]=value);

    try {
        const response = await fetch('/api/sessions/register', {   //Peticion al back
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(obj),
        }).then((res) => {
			if (res.status !== 200) {
				alert(`Error ${res.status}`);
			} else {
				alert(`Registered`);
				window.location.replace('/');
			}
		})} catch (error) {
            console.log(error)
            window.location.href='/';
        }
    }

)

