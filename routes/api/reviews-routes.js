const router = require('express').Router();

// Import the models
const Review = require('../../models/Review');
const User = require('../../models/User');
const Book = require('../../models/Book');
//const { Book } = require('../../models/Book');
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

// Get books with one or more reviews
router.get('/books/more-reviews', async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Review,
                    attributes: ['id'],
                    required: true,
                },
            ],
            group: ['Book.id'],
      order: [[sequelize.literal('COUNT(Reviews.id)'), 'DESC']],
        });

        res.json(books);
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

// Create a new review
router.post('/', async (req, res) => {
    try {
        const { bookId, title, body, score } = req.body;
        const userId = req.session.user_id;

        // Create the review
        const review = await Review.create({
            bookId,
            userId,
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
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review
        review.title = req.body.title;
        review.body = req.body.body;
        review.score = req.body.score;
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
