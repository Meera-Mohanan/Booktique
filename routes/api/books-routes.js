const router = require('express').Router();
const axios = require('axios');
const Book  = require('../../models');

//list of routers--
// Route to add a book to the books table from the Google Books API (parameter-bookid)
// Route to get all books from the database
// Route to search for a book by bookid in the database
// Route for searching books by type from api
// Route for searching books by author or book name from api

//implement later--get a bookid from google api when clicking on a book

// Route to add a book to the books table from the Google Books API
router.post('/:bookId', async (req, res) => {
    try {
      //add the bookid in the body
      const  bookId  = req.params;
  
      // Fetch book details from the Google Books API using the bookId
      const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      const response = await axios.get(apiUrl);
      const bookData = response.data;
      console.log(bookData);
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
  



module.exports = router;

