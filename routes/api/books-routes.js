const router = require('express').Router();
const axios = require('axios');
const Book = require('../../models/Book');

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
    // Add the bookId in the body
    const bookId = req.params.bookId;
    // Check if a record with the same google_books_id exists
    const existingBook = await Book.findOne({
      where: {
        google_books_id: bookId
      }
    });
    if (existingBook) {
      const jsonResponse = {
        message: 'A book with the same google_books_id already exists.',
        existingBook: existingBook
      };
      
      res.json(jsonResponse);
    }
    else {

      // Fetch book details from the Google Books API using the bookId
      const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
      const response = await axios.get(url);
      const bookData = response.data;

      // Extract the relevant book information
      const { title, authors, categories, publishedDate, description } = bookData.volumeInfo;

      let genre = categories && categories.length > 0 ? categories[0] : "Unknown Genre";
      // Limit the number of words in the description
      let limitedDescription = description;
      const words = description.split(' ');
      if (words.length > 200) {
        limitedDescription = description.substring(0, 200);
      }
      // Create a new book instance in the database
      const newBook = await Book.create({
        google_books_id: bookId,
        title: title,
        author: authors ? authors.join(', ') : '',
        genre,
        published_date: publishedDate,
        description: limitedDescription,
      });
      res.status(201).json(newBook);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all books from the database
router.get('/all', async (req, res) => {
  try {
    const books = await Book.findAll(); // Retrieve all books from the books table
    res.json(books); // Return the books as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to search for a book by bookid in the database
router.get('/id', async (req, res) => {
  try {
    const bookId = req.query.bookId;

    const book = await Book.findOne({ where: { google_books_id: bookId } });

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

