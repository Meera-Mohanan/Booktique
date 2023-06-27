const router = require('express').Router();


router.get('/', (req,res) => {

    res.json({ data: 'hi' })

});

module.exports = router;