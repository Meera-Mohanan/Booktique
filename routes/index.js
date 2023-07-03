require('dotenv').config();
const router = require('express').Router();
const apiRoutes = require('./api');

const landingRoutes = require('./landingRoutes.js');


router.use('/',landingRoutes);
router.use('/api', apiRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

module.exports = router;