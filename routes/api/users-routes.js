const router = require('express').Router();
const { User } = require('../../models');

router.post('/register', async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check if the email is already taken
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already taken.' });
    }

    // Create the user
    let userData = await User.create({ name, password, email });
    userData=userData.dataValues;
     req.session.save(() => {
      
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    let userData = await User.findOne({ where: { email: req.body.email } });

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
    userData=userData.dataValues;
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_In = true;
      document.getElementById('loginmsg').style.display = 'block';
      setTimeout(()=>{
        document.getElementById('loginmsg').style.display = 'none';
      },2000)
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      document.getElementById('logoutmsg').style.display = 'block';
      setTimeout(()=>{
        document.getElementById('logoutmsg').style.display = 'none';
      },2000)
      res.json({ message: 'You are logged out successfully!' });
      //res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});


// Route to update user details
router.put('/update', async (req, res) => {
  try {
    const id = req.query.userId;
    const { name, password, email } = req.body;

    //const user = await User.findByPk(id);
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user details
    user.name = name ? name : user.name,
    user.password= password ? password : user.password,
    user.email= email ? email : user.email,

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;