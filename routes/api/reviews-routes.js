const router = require('express').Router();

// Import the models
const Review = require('../../models/Review');
const User = require('../../models/User');
const Book = require('../../models/Book');

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [User, Book],
        });
        // res.json(reviews);
        res.render('yourreviews', { reviews, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get top scored reviews
router.get('/top', async (req, res) => {
    try {
        const topReviews = await Review.findAll({
            order: [['score', 'DESC']], // Sort by score in descending order
            limit: 10, // Limit the result to 10 reviews (adjust as needed)
        });

        res.json(topReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to fetch reviews for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
      const user_id = req.params.userId;
  
      // Fetch reviews for the specified user
      const reviews = await Review.findAll({
        include: [User, Book],
        where: { user_id },
      });
      console.log(reviews);
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Get one review
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id, {
            include: [User, Book],
        });
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { book_id, user_id, title, body, score } = req.body;

        // Check if the review already exists
        const existingReview = await Review.findOne({
            where: { book_id, user_id },
        });

        // If the review already exists, send a response indicating it exists
        if (existingReview) {
            return res.status(409).json({ error: 'Review already exists' });
        }

        // Create the review
        const review = await Review.create({
            book_id,
            user_id,
            title,
            body,
            score,
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Update a review
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        const {title, body, score } = req.body;

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review
        review.title = title ? title: review.title;
        review.body = body ? body: review.body;
        review.score = score ? score: review.score;
        await review.save();

        res.json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Delete the review
        await review.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
