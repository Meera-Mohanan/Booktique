// Import any necessary dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define user model
const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});

// Establish association with Review model
User.hasMany(Review, { foreignKey: 'userId' });

//Export the user model
module.exports = User;
