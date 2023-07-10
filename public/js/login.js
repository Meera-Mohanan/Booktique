async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  //console.log(response);
      if (response.ok) {
        const data=await response.json();
        console.log(data);
        document.location.replace('/'); 
      } else {
      
        /* const data=await response.json();
        //console.log(data);
        document.getElementById("loginmessage").textContent =data.message; */
        console.log("login failed");
      }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
