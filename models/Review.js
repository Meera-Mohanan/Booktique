const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model{}

Review.init(
{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refrences: {
      model: 'books',
      key: 'id',
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    refrences: {
      model: 'users',
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
},
{
  sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
}
);


// Export the Review model
module.exports = Review;
