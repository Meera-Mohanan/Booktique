document.querySelector('#edit-profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const userid = document.querySelector('input[name="userId"]').value;
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    // const password = document.querySelector('#password').value;
    
    // Check if the password field is empty
    const requestBody = {
      name,
      email,
    };
  
    // if (password.trim() !== '') {
    //   requestBody.password = password;
    // }
    
    try {
      const response = await fetch(`/edit`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
       // document.location.replace('/profilesettings');
        window.location.href = '/profilesettings';

      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error(error);
    }
  });
  