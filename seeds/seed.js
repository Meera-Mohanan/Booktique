const sequelize = require('./sequelize');
const Book = require('./models/book');
const Review = require('./models/review');
const bookSeedData = require('./bookSeeder.json');
const reviewSeedData = require('./reviewSeeder.json');

async function seedDatabase() {
  try {
    // Seed books
    await Book.bulkCreate(bookSeedData.books);
    console.log('Books seeded successfully.');

    // Seed reviews
    await Review.bulkCreate(reviewSeedData.reviews);
    console.log('Reviews seeded successfully.');

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sequelize.close(); // Close the database connection
  }
}

seedDatabase();
