const router = require('express').Router();
const bookRoutes = require('./books-routes');
const apiRoutes = require('./api-routes');
const reviewRoutes = require('./reviews-routes');
const usersRoutes = require('./users-routes');

router.use('/books', bookRoutes);
router.use('/googlebooks', apiRoutes);
router.use('/review', reviewRoutes);
router.use('/user', usersRoutes);

module.exports = router;

