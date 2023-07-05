const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//Dashboard page routes
router.get('/', withAuth, (req, res) => {
    
});