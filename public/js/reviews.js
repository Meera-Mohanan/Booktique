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
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const reviews = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (reviews.ok) {
      //const reviews = await fetchUserReviews(userId);
      res.render('yourreviews', { reviews });
    } else {
      alert('Failed to delete project');
    }
  }
};

/* document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
 */



/* async function reviewsHandler(event) {

    event.preventDefault();

    // const id;






async function reviewsHandler(req, res) {
    try {
      // Retrieve the logged-in user's ID from the session data
      //const userId = req.user.id;
     const userId=1;
      // Perform any necessary data retrieval or API requests using the user's ID
      const reviews = await fetchUserReviews(userId);
        
      res.render('yourreviews', { reviews });
    } catch (error) {
      // Handle any errors that occur during the data retrieval or rendering
      console.error('Error retrieving or rendering reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  } 

  


  */