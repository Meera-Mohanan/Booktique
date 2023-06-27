const router = require('express').Router();
const axios = require('axios');

// get books from googlebooks api based on book_name
// get books from googlebooks api based on author_name
//get books from database

// Get books from Google Books API based on a keyword
router.get('/fantasy-books', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchQuery = 'pride prejudice'; // Set the search query to the desired book title
        const url = `https://www.googleapis.com/books/v1/volumes`;
        const params = {
          q: searchQuery,
          key: apiKey,
          //maxResults: 1
        };
      
        const response = await axios.get(url, { params });
        const books = response.data.items[0]; // Extract the books from the API response restricting to one book here
       // const books = response.data.items; // Extract the books from the API response restricting to one book here
        res.json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        // Handle the error appropriately
      }
});

module.exports = router;
