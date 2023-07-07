
async function newReviewHandler(event) {
    event.preventDefault();
    const book_id = document.querySelector('input[name="bookid"]').value;

    const title = document.querySelector('textarea[name="title"]').value;
    const body = document.querySelector('textarea[name="review"]').value;
    const scoreSelect = document.getElementById('score');
    const score = scoreSelect.value;
    const response = await fetch(`/savereview`, {
        method: 'POST',
        body: JSON.stringify({
            book_id,
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

document.querySelector('#add-review-form').addEventListener('submit', newReviewHandler);


