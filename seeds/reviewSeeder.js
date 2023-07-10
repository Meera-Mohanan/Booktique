const { Review } = require('../models');

const reviewData = [
  { book_id: 1, user_id: 1, title: 'Review 1', body: 'Lorem ipsum dolor sit amet.', score: 4 },
  { book_id: 1, user_id: 2, title: 'Review 2', body: 'Consectetur adipiscing elit.', score: 5 }
];

const seedReviews = async () => {
  for (const review of reviewData) {
    await Review.create(review);
  }
};

module.exports = seedReviews;
