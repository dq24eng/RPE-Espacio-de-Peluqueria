const form =document.getElementById('loginForm');

form.addEventListener('submit', async (e) =>{

    e.preventDefault();
    const data= new FormData(form);
    const loginPayload = Object.fromEntries(data)
    console.log("Loginplayload:" + loginPayload)

    try {
        const response = await fetch('/api/sessions/login', {   //Peticion al back
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(loginPayload)
        }).then((res) => {
			if (res.status !== 200) {
				alert(`Invalid credentials`);
			} else {
				alert(`Loged`);
				window.location.replace('/');
			}
		})} catch (error) {
            console.log(error)
            window.location.href='/';
        }
    }
)
