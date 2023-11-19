async function GetSelectedItem(el, idUser) {
    const e = document.getElementById(el);
    try {
        const url = '/api/users/updateRole/' + idUser + '/' + e.options[e.selectedIndex].value; 
        const response = await fetch(url, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: 'Fetch PUT Role Update' })
        }).then((res) => {
			if (res.status !== 201) {
				alert(`An error has occurred ` + res.status);
			} else {
				alert(`User Role updated`);
				window.location.replace('/');
			}
		})
    } catch (error) {
        console.log(error)
        window.location.href='/';
    }
}

async function DeleteUser(id) {
    try {
        const url = '/api/users/deleteUser/' + id;
        const response = await fetch (url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: 'Fetch DELETE Role' })
        }).then((res) => {
			if (res.status !== 201) {
				alert(`An error has occurred ` + res.status + ' ' + url);
			} else {
				alert(`The user has been deleted`);
				window.location.replace('/');
			}
		})
    } catch (error) {
        console.log(error)
        window.location.href='/';
    }
}

