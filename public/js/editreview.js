// editreview.js
document.querySelector('#edit-review-form').addEventListener('submit', async (event) => {
  event.preventDefault();
 
  const reviewid = document.querySelector('input[name="reviewId"]').value;
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const score = document.querySelector('#score').value;
  console.log(reviewid);
try{
  const response = await fetch(`/edit/${reviewid}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
      score,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/reviews');
  } else {
    alert('Failed to update review');
  }} catch (error) {
    console.error(error);
  }
  
});
