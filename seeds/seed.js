const axios = require('axios');
const sequelize = require('./sequelize');
const User = require('./models/user');
const Review = require('./models/review');
const Book = require('./models/book');

async function seedUsers() {
  try {
    // Read the userSeeder.json file
    const userSeedData = require('./seeders/userSeeder.json');

    // Perform the seeding logic for user data
    await User.bulkCreate(userSeedData.users);

    console.log('User seeding completed!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

async function seedReviews() {
  try {
    // Read the reviewSeeder.json file
    const reviewSeedData = require('./seeders/reviewSeeder.json');

    // Perform the seeding logic for review data
    await Review.bulkCreate(reviewSeedData.reviews);

    console.log('Review seeding completed!');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  }
}

async function seedBooks() {
  try {
    // Fetch book data from the Google Books API
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=javascript');
    const apiBooks = response.data.items;

    // Extract relevant data from API response
    const bookData = apiBooks.map(book => {
      return {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors && book.volumeInfo.authors.join(', '),
        genre: book.volumeInfo.categories && book.volumeInfo.categories.join(', '),
        publishedDate: book.volumeInfo.publishedDate
      };
    });

    // Perform the seeding logic for book data
    await Book.bulkCreate(bookData);

    console.log('Book seeding completed!');
  } catch (error) {
    console.error('Error seeding books:', error);
  }
}

async function seedDatabase() {
  try {
    // Seed the data
    await seedUsers();
    await seedReviews();
    await seedBooks();

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sequelize.close(); // Close the database connection after seeding
  }
}

// Invoke the seedDatabase function
seedDatabase();
