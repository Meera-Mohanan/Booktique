const { User } = require('../models');

const userData = [
  { name: 'John Doe', email: 'johndoe@example.com', password: 'password1' },
  { name: 'Jane Smith', email: 'janesmith@example.com', password: 'password2' },
];

const seedUsers = async () => {
  await User.bulkCreate(userData);
};


module.exports = seedUsers;
