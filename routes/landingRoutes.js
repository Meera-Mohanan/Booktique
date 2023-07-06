const { Review ,User, Book} = require('../models');
const auth = require('../utils/auth');

const router = require('express').Router();


router.get('/', (req,res) => {

    // res.json({ data: 'hi' })
    res.render('landingpage', {loggedIn: req.session.loggedIn});
    // res.render('landingpage', { post, loggedIn: true });

});
// Get all reviews
router.get('/reviews', auth, async (req, res) => {
    try {
        //console.log(req.session);
        let user_id = req.session.user_id;
        if(user_id=="undefined"){
            res.redirect('/');
        }
        const reviews_data = await Review.findAll({
            where:{user_id:user_id},
            include: [User, Book],
            
        });
        const reviews = reviews_data.map((review) => review.get({ plain: true }));
        
        // res.json(reviews);
        res.render('yourreviews', { reviews, loggedIn: req.session.loggedIn, dontShowReviewNavItem: true });
    } catch (error) {
        
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/reviewsedit/:id',auth, async (req, res) => {
    try {
        const review_data = await Review.findByPk(req.params.id, {
            include: [User, Book],
        });
        const review = review_data.get({ plain: true });
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.render('editreviews', {review,loggedIn: req.session.logged_In});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  });

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
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/profilesettings', (req, res) => {
    res.render('profilesettings', {loggedIn: req.session.logged_in});
})

router.get('/bookreview', (req, res) => {
    res.render('bookreview', {loggedIn: true});
})

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
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