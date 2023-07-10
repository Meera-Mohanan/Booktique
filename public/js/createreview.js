
async function newReviewHandler(event) {
    event.preventDefault();
    const google_book_id = document.querySelector('input[name="bookid"]').value;

    //const title = document.querySelector('textarea[name="title"]').value;
    const textareaElement = document.getElementById('titlet');
const title = textareaElement.value;
const textareaElement1 = document.getElementById('reviewt');
const body = textareaElement1.value;
   // const body = document.querySelector('textarea[name="review"]').value;
    const scoreSelect = document.getElementById('score');
    const score = scoreSelect.value;
    const response = await fetch(`/savereview`, {
        method: 'POST',
        body: JSON.stringify({
            google_book_id,
            title,
            body,
            score,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/reviews');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#add-review-form').addEventListener('submit', newReviewHandler);


