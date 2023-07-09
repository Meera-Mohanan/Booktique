const axios = require('axios');
const { Review, User, Book } = require('../models');
const { update } = require('../models/Book');
const auth = require('../utils/auth');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('landingpage', { loggedIn: req.session.logged_in });
});

//top 12 picks display
router.get('/toppicks', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const url = 'https://www.googleapis.com/books/v1/volumes';
        const params = {
            q: 'top picks',
            orderBy: 'relevance',
            maxResults: 12,
            key: apiKey
        };

        const response = await axios.get(url, { params });
        const books_data = response.data.items;

        const books = []; // Create an empty array to store books with reviews
        //books.reviews=[];
        for (const bookData of books_data) {
            const google_books_id = bookData.id;

            const book = await Book.findOne({ where: { google_books_id }, include: [Review] });

            if (book) {
                const reviews = await Review.findAll({ where: { book_id: book.id }, include: [User, Book] });
                book.reviews = reviews;
                books.push(book);
            }
        }

        const books_revised = books.map((b) => b.get({ plain: true }));


        const array_revised = [];




        for (let b of books_revised) {
            
            if (b.reviews) {
                for (let r of b.reviews) {
                    const review_array = {};
                    review_array.google_book_id = b.google_books_id;
                    review_array.title = r.title;
                    review_array.body = r.body;
                    review_array.score = r.score;

                    array_revised.push(review_array);
                }
            }
        }
        //console.log("print array");
        //console.log(array_revised);
        /* for (let a of array_revised) {
            console.log("a",a);
        } */

        if (req.session.logged_in) {
            res.render('searchbytypeloggedIn', { books_data, array_revised});
        } else {
            res.render('searchbytypeloggedOut', { books_data, array_revised });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//1. type search for dropdown
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

        if (req.session.logged_in) {
            res.render('searchbytypeloggedIn', { books_data, reviews, loggedIn: req.session.logged_in });

        }
        else {
            res.render('searchbytypeloggedOut', { books_data, reviews, loggedIn: req.session.logged_in });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//1. route for searchbar
router.get('/searchbyname', async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        const searchQuery = req.query.inputtext;
        const url = 'https://www.googleapis.com/books/v1/volumes';
        const params = {
            q: `inauthor:${searchQuery}+OR+intitle:${searchQuery}`, // Search by author or book name
            key: apiKey
        };
        const response = await axios.get(url, { params });
        const books_data = response.data.items;
        const reviews_data = await Review.findAll({
            include: [User, Book],
        });
        const reviews = reviews_data.map((review) => review.get({ plain: true }));
        if (req.session.logged_in) {
            res.render('searchbytypeloggedIn', { books_data, reviews, loggedIn: req.session.logged_in });

        }
        else {
            res.render('searchbytypeloggedOut', { books_data, reviews, loggedIn: req.session.logged_in });

        }
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

//4.view a review after clicking view review in searchbytype hb
router.get('/viewreview/:book_id', auth, async (req, res) => {
    try{
        const bookId = req.params.book_id;
        // Check if a record with the same google_books_id exists
        
          const book_data = await Book.findOne({
            where: { google_books_id: bookId },
        });
 
    let reviews_data = []; // Declare and assign an empty array initially

    if (book_data) {
      reviews_data = await Review.findAll({
        where: {
          book_id: book_data.dataValues.id,
        },
      });
     
    }
       
        const reviews = reviews_data.map((review) => review.get({ plain: true }));
        //const book = book_data.dataValues; 
        //console.log(book.title)
        //const book = book_data ? book_data.get({ plain: true }) : null;
        //console.log(book_da);
        res.render('viewonereview', { book:book_data,reviews, loggedIn: req.session.logged_in });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    
}});
    

/// Route for searching a book by book ID from API
router.get('/findbook/:id', async (req, res) => {
    try {

        const book_id = req.params.id;
        const user_id = req.session.user_id;
        // Checking review already exists
        const existingReview = await Review.findOne({
            where: { book_id, user_id },
        });
        if (existingReview) {
            const reviews_data = await Review.findAll({
                where: { user_id: user_id },
                include: [User, Book],

            });
            const reviews = reviews_data.map((review) => review.get({ plain: true }));
            res.render('yourreviews', { reviews, loggedIn: req.session.logged_in, dontShowReviewNavItem: true });
        }
        else {
            const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
            const url = `https://www.googleapis.com/books/v1/volumes/${book_id}`;
            const params = {
                key: apiKey
            };

            const response = await axios.get(url, { params });
            const book = response.data; // Extract the book from the API response
            res.render('createreview', { book, loggedIn: req.session.logged_in });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Save a review
router.post('/savereview', async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const { google_book_id, title, body, score } = req.body;
        // Check if the book exists
        const existingBook = await Book.findOne({
            where: { google_books_id: google_book_id },
        });
        let book_id;
        // If the book exists, retrieve the id
        if (existingBook) {
            book_id = existingBook.id;
        } else {
            // Create the book if it doesn't exist
            const url = `https://www.googleapis.com/books/v1/volumes/${google_book_id}`;
            const response = await axios.get(url);
            const bookData = response.data;

            // Extract the relevant book information
            const { title, authors, categories, publishedDate, description } = bookData.volumeInfo;

            let genre = categories && categories.length > 0 ? categories[0] : "Unknown Genre";
            // Limit the number of words in the description
            let limitedDescription = description;
            const words = description.split(' ');
            if (words.length > 50) {
                limitedDescription = description.substring(0, 50);
            }
            // Create a new book instance in the database
            const newBook = await Book.create({
                google_books_id: google_book_id,
                title: title,
                author: authors ? authors.join(', ') : '',
                genre,
                published_date: publishedDate,
                description: limitedDescription,
            });
            book_id = newBook.id;
        }
        // Check if the review already exists
        const existingReview = await Review.findOne({
            where: { book_id, user_id },
            include: [User, Book],
        });
        // If the review already exists, send a response indicating it exists
        if (existingReview) {

            //render viewonereview
            //document.location.replace('/reviews');
            res.render('/reviews', { loggedIn: req.session.logged_in });
        }
        // Create the review
        const review = await Review.create({
            book_id,
            user_id,
            title,
            body,
            score,
        });
        //render viewonereview
        res.render('/viewreview/:${book_id}', { loggedIn: req.session.logged_in });
       

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


router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/')
        });
    } else {
        res.redirect('/login');
    }
});



module.exports = router;