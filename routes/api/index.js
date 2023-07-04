const router = require('express').Router();
const bookRoutes = require('./books-routes');
const apiRoutes = require('./api-routes');
const reviewRoutes = require('./reviews-routes');
const usersRoutes = require('./users-routes');

router.use('/api/books', bookRoutes);
router.use('/api/googlebooks', apiRoutes);
router.use('/api/review', reviewRoutes);
router.use('/api/users', usersRoutes);

module.exports = router;
