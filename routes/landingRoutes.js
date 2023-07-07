const axios = require('axios');
const { Review, User, Book } = require('../models');
const { update } = require('../models/Book');
const auth = require('../utils/auth');

const router = require('express').Router();


router.get('/', (req, res) => {
    console.log(req.session)
    // res.json({ data: 'hi' })
    res.render('landingpage', { loggedIn: req.session.logged_in });
    // res.render('landingpage', { post, loggedIn: true });

});

//1. type search 
router.get('/searchtype', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchType = req.query.type; // Get the search type from the query parameters
        const url = 'https://www.googleapis.com/books/v1/volumes';
        const params = {
            q: `categories:${searchType}`,
            key: apiKey
        };
        const response = await axios.get(url, { params });
        const books_data = response.data.items;

        const reviews_data = await Review.findAll({
            include: [User, Book],
        });
        const reviews = reviews_data.map((review) => review.get({ plain: true }));
        //const books = books_data.map((book) => book.get({ plain: true }));
        //render books along with reviews from database.
        //console.log(books_data);
        console.log(reviews);
        res.render('searchbytype', { books_data, reviews });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//1. more type search 
router.get('/moretypes', async (req, res) => {
    try {
        res.render('searchmoretypes');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// 1.Will render the your profile settings page.
router.get('/profilesettings', auth, async (req, res) => {
    try {
        let user_id = req.session.user_id;
        if (user_id === undefined) {
            return res.redirect('/');
        }
        const user_data = await User.findAll({
            where: { id: user_id },
        });
        let user = user_data.map((u) => u.get({ plain: true }));
        user = user[0];
        res.render('profilesetting', { user, loggedIn: req.session.logged_in, dontShowReviewNavItem: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

//2.rendering the page to edit the profile.
router.get('/useredit', auth, async (req, res) => {
    try {
        let user_id = req.session.user_id;
        if (user_id === undefined) {
            return res.redirect('/');
        }
        const user_data = await User.findAll({
            where: { id: user_id },
        });
        let user = user_data.map((u) => u.get({ plain: true }));
        user = user[0];
        res.render('editprofilesettings', { user, loggedIn: req.session.logged_in, dontShowReviewNavItem: true });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

//3.updating user details and directing to profilesetting page.
router.put('/edit', async (req, res) => {
    try {
        let user_id = req.session.user_id;
        if (user_id === undefined) {
            return res.redirect('/');
        }

        const { name, email, password } = req.body;

        // Retrieve the existing review from the database
        let user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        //console.log(password)
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// 1.Will render the your reviews page.
router.get('/reviews', auth, async (req, res) => {
    try {
        //console.log(req.session);
        let user_id = req.session.user_id;
        if (user_id == "undefined") {
            res.redirect('/');
        }
        const reviews_data = await Review.findAll({
            where: { user_id: user_id },
            include: [User, Book],

        });
        const reviews = reviews_data.map((review) => review.get({ plain: true }));

        // res.json(reviews);
        res.render('yourreviews', { reviews, loggedIn: req.session.logged_in, dontShowReviewNavItem: true });
    } catch (error) {

        res.status(500).json({ error: 'Server error' });
    }
});

//2.rendering the page to edit the selected review.
router.get('/reviewsedit/:id', auth, async (req, res) => {
    try {
        const review_data = await Review.findByPk(req.params.id, {
            include: [User, Book],
        });
        const review = review_data.get({ plain: true });
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.render('editreviews', { review, loggedIn: req.session.logged_in });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//3.updating review and directing to yourreviews page.
router.put('/edit/:id', async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { title, body, score } = req.body;

        // Retrieve the existing review from the database
        const review = await Review.findByPk(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        review.title = title || review.title;
        review.body = body || review.body;
        review.score = score || review.score;
        await review.save();

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/profilesettings', (req, res) => {
    res.render('profilesettings', { loggedIn: req.session.logged_in });
})

router.get('/bookreview', (req, res) => {
    res.render('bookreview', { loggedIn: req.session.logged_in });
})

router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/')
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/newreview', (req, res) => {
    res.render('newreview');
});


module.exports = router;