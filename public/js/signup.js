async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    //console.log(username,password);
    if (username && password && email) {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify({
                name:username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {        
            document.location.replace('/');
        } else {
            //console.log(response);
            const data=await response.json();
            if(data.error=="Validation error: Validation len on password failed"){
                document.getElementById("signupmessage").textContent ="Password length should be greater than 8, Please try again..";
            }
            else{
                console.log(data.error);
            document.getElementById("signupmessage").textContent =data.error;
            }
            //alert(data.error);
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);