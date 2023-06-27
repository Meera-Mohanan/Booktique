// Import any necessary dependencies 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

// Define the Book model
const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, 

// Establish association with Review model
Book.hasMany(Review, { foreignKey: 'bookId' });

// Export the Book model
module.exports = Book;
