// Function to extract the book ID from the URL query parameter
function getBookIdFromQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('id');
  }
  
  // Function to fetch and display the book details
  async function fetchBookDetails() {
    try {
      const bookId = getBookIdFromQueryParams();
  
      if (!bookId) {
        // Handle the case when book ID is not provided
        console.error('Book ID is missing');
        return;
      }
  
      const response = await fetch(`/api/books/${bookId}`); // Fetch book details from the server
      const book = await response.json();
  
      // Update the book details in the HTML template
      const bookTitleElement = document.querySelector('.book-title');
      const bookAuthorElement = document.querySelector('.book-author');
      const bookPublished_dateElement = document.querySelector('.book-published_date');
      const bookGenreElement = document.querySelector('.book-genre');
      const bookDescriptionElement = document.querySelector('.book-description');
      const bookReviewsElement = document.querySelector('.book-reviews');
  
      bookTitleElement.textContent = book.title;
      bookAuthorElement.textContent = `Author: ${book.author}`;
      bookPublished_dateElement.textContent = `Published Date: ${book.published_date}`;
      bookGenreElement.textContent = `Genre: ${book.genre}`;
      bookDescriptionElement.textContent = `Description: ${book.description}`;
      bookReviewsElement.textContent = `Reviews: ${book.reviews}`;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Call the fetchBookDetails function to load and display the book details
  fetchBookDetails();
  