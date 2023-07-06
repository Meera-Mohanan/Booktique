const Book = require('../../models/Book');
const axios = require('axios');
const router = require('express').Router();

router.get('/searchbyname', async (req, res) => {
  try {
    const apiKey = 'AIzaSyDAyeDqH5UigJe1-nVRvV-GLRm0MurjIgs';
    const searchQuery = req.query.searchbook; // Get the search query from the query parameters

    const url = 'https://www.googleapis.com/books/v1/volumes';

    const params = {
      q: `inauthor:${searchQuery}+OR+intitle:${searchQuery}`, // Search by author or book name
      key: apiKey
    };

    const response = await axios.get(url, { params });
    const searchResults = response.data.items; // Extract the search results from the API response
    const books = response.data.items; // Extract the books from the API response

    res.json(books); // Return the books as a JSON response

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/search-results', async (req, res) => {
  res.render('search-results');
});


module.exports = router;