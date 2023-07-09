require('dotenv').config();
const router = require('express').Router();
const apiRoutes = require('./api');
const landingRoutes = require('./landingRoutes.js');

const reviewRoutes = require('./api/reviews-routes');
/* 
const bookRoutes = require('./api/books-routes');
const apiRoutes = require('./api/api-routes');

const usersRoutes = require('./api/users-routes'); */
router.use('/api',apiRoutes)
router.use('/',landingRoutes);
router.use('/review', reviewRoutes);
/* router.use('/books', bookRoutes);
router.use('/googlebooks', apiRoutes);

router.use('/user', usersRoutes); */

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
     });

module.exports = router;




