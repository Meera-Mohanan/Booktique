const router = require('express').Router();
const axios = require('axios');
const { Book } = require('../../models');

//list of routers--
// Route to add a book to the books table from the Google Books API (parameter-bookid)
// Route to get all books from the database
// Route to search for a book by bookid in the database
// Route for searching books by type from api
// Route for searching books by author or book name from api

//implement later--get a bookid from google api when clicking on a book

// Route to add a book to the books table from the Google Books API
router.post('/add/:bookId', async (req, res) => {
    try {
      const { bookId } = req.params;
  
      // Fetch book details from the Google Books API using the bookId
      const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      const response = await axios.get(apiUrl);
      const bookData = response.data;
  
      // Extract the relevant book information
      const { title, authors, categories, publishedDate, description } = bookData.volumeInfo;
  
      // Create a new book instance in the database
      const newBook = await Book.create({
        bookId,
        title,
        author: authors.join(', '),
        genre: categories.join(', '),
        publicationDate: publishedDate,
        description,
      });
  
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// Route to get all books from the database
router.get('/all', async (req, res) => {
  try {
    const books = await books.findAll(); // Retrieve all books from the books table
    res.json(books); // Return the books as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to search for a book by bookid in the database
router.get('/:bookid', async (req, res) => {
    try {
      const { bookid } = req.params;
  
      // Search for the book in the database by bookid
      const book = await Book.findOne({ bookid });
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


// Route for searching books by type from api
router.get('/search/:type', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchType = req.params.type; // Get the search type from the request URL parameter

        const url = `https://www.googleapis.com/books/v1/volumes`;

        const params = {
            q: `type:${searchType}`, // Add the search type parameter to the query
            key: apiKey
        };

        const response = await axios.get(url, { params });
        console.log();
        const books = response.data.items;

        // Process the books as needed
        res.json(books); // Return the books as a JSON response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for searching books by author or book name from api
router.get('/search/:query', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchQuery = req.params.query; // Get the search query from the request URL parameter

        const url = 'https://www.googleapis.com/books/v1/volumes';

        const params = {
            q: `inauthor:${searchQuery}+OR+intitle:${searchQuery}`, // Search by author or book name
            key: apiKey
        };

        const response = await axios.get(url, { params });

        const books = response.data.items; // Extract the books from the API response

        // Process the books as needed
        res.json(books); // Return the books as a JSON response

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;



/* // Get books from Google Books API based on a book  title from api
router.get('/:name', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchQuery = req.params.name; 
        //const searchQuery = 'pride prejudice'; // Set the search query to the desired book title
        const url = `https://www.googleapis.com/books/v1/volumes`;
        const params = {
          q: searchQuery,
          key: apiKey,
          //maxResults: 1
        };
      
        const response = await axios.get(url, { params });
        const books = response.data.items; // Extract the books from the API response 
       // const books = response.data.items[0]; // Extract the books from the API response restricting to one book here
        res.json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        // Handle the error appropriately
      }
});


  // Route for searching books by author from api
router.get('/books/author/:authorName', async (req, res) => {
    try {
      const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
      const authorName = req.params.authorName;
  
      const url = 'https://www.googleapis.com/books/v1/volumes';
  
      const params = {
        q: `inauthor:${authorName}`, // Add the author name to the query parameter
        key: apiKey
      };
  
      const response = await axios.get(url, { params });
  
      const books = response.data.items;
      res.json(books);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); */




