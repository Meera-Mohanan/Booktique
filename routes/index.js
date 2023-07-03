require('dotenv').config();
const router = require('express').Router();
// const apiRoutes = require('./api');

const landingRoutes = require('./landingRoutes.js');


router.use('/',landingRoutes);
// router.use('/api', apiRoutes);

// // router.use((req, res) => {
// //   res.send("<h1>Wrong Route!</h1>")
// // });

// module.exports = router;



const bookRoutes = require('./api/books-routes');
const apiRoutes = require('./api/api-routes');
const reviewRoutes = require('./api/reviews-routes');
const usersRoutes = require('./api/users-routes');

router.use('/books', bookRoutes);
router.use('/googlebooks', apiRoutes);
router.use('/review', reviewRoutes);
router.use('/user', usersRoutes);

module.exports = router;



