const router = require('express').Router();
const landingRoutes = require('./landingRoutes.js');
// const dashboardRoutes = require('./dashboardRoutes.js'); 


router.use('/',landingRoutes);
// router.use('/dashboard', dashboardRoutes);


module.exports = router;