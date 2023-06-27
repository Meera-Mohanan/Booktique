const router = require('express').Router();
const axios = require('axios');


//get books from database


// Route for searching books by type
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

  // Route for searching books by author or book name
router.get('/books/:query', async (req, res) => {
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
  
 
/* // Get books from Google Books API based on a book  title
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


  // Route for searching books by author
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
  
  
  

module.exports = router;
