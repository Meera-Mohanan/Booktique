const router = require('express').Router();
const landingRoutes = require('./landingRoutes.js');


router.use('/',landingRoutes);


module.exports = router;