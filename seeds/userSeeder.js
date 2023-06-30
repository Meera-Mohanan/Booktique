const { User } = require('../models');

const userData = [
  { name: 'John Doe', email: 'johndoe@example.com', password: 'password1' },
  { name: 'Jane Smith', email: 'janesmith@example.com', password: 'password2' },
];

const seedUsers = async () => {
  // TODO: for loop -- call create() individually --- to trigger the create hook
  await User.bulkCreate(userData,{individualHooks: true,
    returning: true,
});
};


module.exports = seedUsers;
