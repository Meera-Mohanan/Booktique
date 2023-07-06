async function newReviewHandler(event) {
  event.preventDefault();

  // const bookId = document.querySelector('input[name="bookId"]').value;
  // const title = document.querySelector('input[name="title"]').value;
  // const body = document.querySelector('input[name="body"]').value;
  
  const score = document.getElementById('reviewscore').value;

  const response = await fetch(`/review`, {
    method: 'POST',
    body: JSON.stringify({
      bookId,
      title,
      body,
      score,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/review');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#new-review-form').addEventListener('submit', newReviewHandler);