const { Review, User, Book } = require('../models');
const auth = require('../utils/auth');
const axios = require('axios');

const router = require('express').Router();

router.get('/searchbyname', async (req, res) => {
  try {
    const apiKey = 'AIzaSyDAyeDqH5UigJe1-nVRvV-GLRm0MurjIgs';
    const searchQuery = req.query.id; // Get the search query from the query parameters

    const url = 'https://www.googleapis.com/books/v1/volumes';

    const params = {
      q: `inauthor:${searchQuery}+OR+intitle:${searchQuery}`, // Search by author or book name
      key: apiKey
    };

    const response = await axios.get(url, { params });

    const books = response.data.items; // Extract the books from the API response

    res.json(books); // Return the books as a JSON response

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
