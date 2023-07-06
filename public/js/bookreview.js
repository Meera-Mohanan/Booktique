// Function to create and show the book details page
function showBookDetails(book) {
  // Clear the existing content on the page
  document.body.innerHTML = '';

  // Create a big container for the book details
  const bigContainer = document.createElement('div');
  bigContainer.classList.add('big-container');

  // Create elements to display the book details
  const titleElement = document.createElement('h2');
  titleElement.textContent = book.title;

  const authorElement = document.createElement('p');
  authorElement.textContent = `Author: ${book.author}`;

  const published_dateElement = document.createElement('p');
  published_dateElement.textContent = `Published Date: ${book.published_date}`;

  const genreElement = document.createElement('p');
  genreElement.textContent = `Genre: ${book.genre}`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${book.description}`;

  const reviewsElement = document.createElement('p');
  reviewsElement.textContent = `Reviews: ${book.reviews}`;

  // Append book details to the big container
  bigContainer.appendChild(titleElement);
  bigContainer.appendChild(authorElement);
  bigContainer.appendChild(published_dateElement);
  bigContainer.appendChild(genreElement);
  bigContainer.appendChild(descriptionElement);
  bigContainer.appendChild(reviewsElement);

  // Append the big container to the body
  document.body.appendChild(bigContainer);
}

// Fetch books from your custom router and render the book list
async function fetchBooks() {
  try {
    const response = await fetch('/api/books/all'); // Fetch books from the custom router
    const books = await response.json();

    // Get the bookList element
    const bookList = document.getElementById('bookList');

    // Iterate over the books and create HTML elements to display the book information
    for (const book of books) {
      // Extract relevant book details
      const title = book.title;
      const author = book.author;
      const published_date = book.published_date;
      const book_id = book.id;
      const reviews = book.reviews;
      const genre = book.genre;
      const description = book.description;

      // Create a container for each book
      const bookContainer = document.createElement('div');
      bookContainer.classList.add('book');

      // Create elements for book details
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;

      const authorElement = document.createElement('p');
      authorElement.textContent = `Author: ${author}`;

      const published_dateElement = document.createElement('p');
      published_dateElement.textContent = `Published Date: ${published_date}`;

      const genreElement = document.createElement('p');
      genreElement.textContent = `Genre: ${genre}`;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Description: ${description}`;

      const reviewsElement = document.createElement('p');
      reviewsElement.textContent = `Reviews: ${reviews}`;

      // Create a button for book details
      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'Book Details';

      // Add click event listener to show book details
      detailsButton.addEventListener('click', () => {
        showBookDetails(book);
      });

      // Append book details and button to the book container
      bookContainer.appendChild(titleElement);
      bookContainer.appendChild(authorElement);
      bookContainer.appendChild(published_dateElement);
      bookContainer.appendChild(genreElement);
      bookContainer.appendChild(descriptionElement);
      bookContainer.appendChild(reviewsElement);
      bookContainer.appendChild(detailsButton);

      // Append the book container to the book list
      bookList.appendChild(bookContainer);
    }
  }catch (error) {
    console.error(error);
  }
}

// Call the fetchBooks function to load and display the book data
fetchBooks();
