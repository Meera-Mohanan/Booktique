const router = require('express').Router();


router.get('/', (req,res) => {

    // res.json({ data: 'hi' })
    res.render('landingpage');

});

module.exports = router;