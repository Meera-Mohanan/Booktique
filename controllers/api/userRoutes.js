const router = require('express').Router();
const { User } = require('../../models');

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    // Extract the required fields from req.body, such as username, password, etc.
    const { username, password, email } = req.body;

    // Implement logic to create a new user in your database
    const newUser = await User.create({ username, password, email });

    // Save the new user's information to the session and set logged_in to true
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      
      res.json({ user: newUser, message: 'You are now registered and logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/login'); // Redirect to the login page
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
