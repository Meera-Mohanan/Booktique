require('dotenv').config();
const router = require('express').Router();
//const apiRoutes = require('./api');
const landingRoutes = require('./landingRoutes.js');
const bookRoutes = require('./api/books-routes');
const apiRoutes = require('./api/api-routes');
const reviewRoutes = require('./api/reviews-routes');
const usersRoutes = require('./api/users-routes');

router.use('/',landingRoutes);
router.use('/books', bookRoutes);
router.use('/googlebooks', apiRoutes);
router.use('/review', reviewRoutes);
router.use('/user', usersRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
     });

module.exports = router;




