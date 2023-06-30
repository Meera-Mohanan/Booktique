const { Book } = require('../models');

const bookData = [
  { title: 'Book 1', author: 'Author 1', genre: 'Genre 1', published_date: '2022-01-01' },
  { title: 'Book 2', author: 'Author 2', genre: 'Genre 2', published_date: '2022-02-01' },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;