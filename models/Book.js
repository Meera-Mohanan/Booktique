// Import any necessary dependencies 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Book extends Model{}

Book.init( 
{
  id: {
    type: DataTypes.STRING,
    allowNull: false,
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
  published_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'book',
}
); 

// Export the Book model
module.exports = Book;
