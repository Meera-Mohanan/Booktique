 /* const newFormHandler = async (event) => {
  event.preventDefault();
 // Retrieve the logged-in user's ID from the session data
      //const userId = req.user.id;
      const userId=1;

  if (userId) {
    const response = await fetch(`/review/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  } 
};*/
const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Reload the page or update the UI as needed
      location.reload(/api/reviews);
    } else {
      alert('Failed to delete review');
    }
  }
};

document.querySelector('#delete-review').addEventListener('click', delButtonHandler);

