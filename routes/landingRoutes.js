const { Review ,User, Book} = require('../models');

const router = require('express').Router();


router.get('/', (req,res) => {

    res.render('landingpage', {loggedIn: req.session.logged_in});
    // res.render('landingpage', { post, loggedIn: true });

});
// Get all reviews
router.get('/reviews', async (req, res) => {
    try {
        //console.log(req.session);
        let user_id = req.session.user_id;
        if(!user_id){
            res.render('/login');
        }
        const reviews_data = await Review.findAll({
            where:{user_id:user_id},
            include: [User, Book],
            
        });
        const reviews = reviews_data.map((review) => review.get({ plain: true }));
        
        // res.json(reviews);
        res.render('yourreviews', { reviews, loggedIn: req.session.logged_in });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// router.get('/review', (req, res) => {
//     res.render('yourreviews', {loggedIn: true});
// })



router.get('/profilesettings', (req, res) => {
    res.render('profilesettings', {loggedIn: req.session.logged_in});
})

router.get('/bookreview', (req, res) => {
    res.render('bookreview', {loggedIn: true});
})



router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


router.get('/newreview', (req, res) => {
    res.render('newreview');
});

module.exports = router;