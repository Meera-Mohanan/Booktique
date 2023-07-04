// Function to check if the user is logged in
function isUserLoggedIn() {
  // Replace this with your actual logic to check if the user is logged in
  const isLoggedIn = true; // Example: assuming the user is logged in
  return isLoggedIn;
}

// Fetch books by William Shakespeare from the Google Books API and render the book list
async function fetchBooks() {
  try {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=inauthor:William%20Shakespeare');
    const data = await response.json();
    const books = data.items;

    // Get the bookList element
    const bookList = document.getElementById('bookList');

    // Iterate over the books and create HTML elements to display the book information
    books.forEach((book) => {
      // Extract relevant book details
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
      const publishedDate = book.volumeInfo.publishedDate || 'Unknown Published Date';
      const description = book.volumeInfo.description || 'No description available';
      const bookId = book.id;

      // Create a container for each book
      const bookContainer = document.createElement('div');
      bookContainer.classList.add('book');

      // Create elements for book details
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;

      const authorsElement = document.createElement('p');
      authorsElement.textContent = `Author(s): ${authors}`;

      const publishedDateElement = document.createElement('p');
      publishedDateElement.textContent = `Published Date: ${publishedDate}`;

      // Append book details to the book container
      bookContainer.appendChild(titleElement);
      bookContainer.appendChild(authorsElement);
      bookContainer.appendChild(publishedDateElement);

      // Create the "Add Reviews" button
      const addReviewButton = document.createElement('button');
      addReviewButton.textContent = 'Add Reviews';

      // Add click event listener to the "Add Reviews" button
      addReviewButton.addEventListener('click', () => {
        // Redirect to the appropriate page based on the user's login status
        if (isUserLoggedIn()) {
          window.location.href = '/add-new-review';
        } else {
          window.location.href = '/sign-up-login';
        }
      });

      // Append the "Add Reviews" button to the book container
      bookContainer.appendChild(addReviewButton);

      // Add click event listener to display book reviews on click
      bookContainer.addEventListener('click', async () => {
        // Clear existing reviews
        clearReviews();

        try {
          // Fetch reviews for the book from your custom reviews route
          const reviewsResponse = await fetch(`/api/bookreviews/${bookId}`);
          const reviewsData = await reviewsResponse.json();
          const reviews = reviewsData.reviews;

          // Create an element for book reviews
          const reviewsElement = document.createElement('div');
          reviewsElement.classList.add('reviews');

          // Add reviews to the reviews element
          reviews.forEach((review) => {
            const reviewElement = document.createElement('p');
            reviewElement.textContent = review.body;

            reviewsElement.appendChild(reviewElement);
          });

          // Append the reviews element to the book container
          bookContainer.appendChild(reviewsElement);
        } catch (error) {
          console.error(error);
        }
      });

      // Append the book container to the book list
      bookList.appendChild(bookContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to clear reviews
function clearReviews() {
  const reviewsElements = document.getElementsByClassName('reviews');
  while (reviewsElements.length > 0) {
    reviewsElements[0].remove();
  }
}

// Call the fetchBooks function to load and display the book data
fetchBooks();
