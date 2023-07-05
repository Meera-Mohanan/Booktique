
const delButtonHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute('data-id')) {
  const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/review/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Reload the page or update the UI as needed
      location.reload('/reviews');
    } else {
      alert('Failed to delete review');
    }
  }
};

document.querySelector('#delete-review').addEventListener('click', delButtonHandler);
