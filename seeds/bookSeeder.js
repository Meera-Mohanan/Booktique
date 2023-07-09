const { Book } = require('../models');

const bookData = [
  { id:'1', google_books_id: 'a11', title: 'Book 1', author: 'Author 1', genre: 'Genre 1', published_date: '2022-01-01',description: 'about this book1' },
  { id:'2', google_books_id: 'a22', title: 'Book 2', author: 'Author 2', genre: 'Genre 2', published_date: '2022-02-01', description: 'about this book2' },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;