const Book = require('./Book');
const Review = require('./Review');
const User = require('./User');
const sequelize = require('../config/connection');


// Establish associations
Book.hasMany(Review, { 
    foreignKey: 'book_id'
});
User.hasMany(Review, { 
    foreignKey: 'user_id'
 });
Review.belongsTo(User, { 
    foreignKey: 'user_id'
});
Review.belongsTo(Book, { 
    foreignKey: 'book_id' 
});

module.exports = { User, Book, Review};