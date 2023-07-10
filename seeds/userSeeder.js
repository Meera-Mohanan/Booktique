
const { User } = require('../models');

const userData = [
  { name: 'John Doe', email: 'johndoe@example.com', password: 'password1' },
  { name: 'Jane Smith', email: 'janesmith@example.com', password: 'password2' },
];

const seedUsers = async () => {
  for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
    await User.create(user);
  }
};

module.exports = seedUsers;
