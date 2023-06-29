const router = require('express').Router();


router.get('/', (req,res) => {

    // res.json({ data: 'hi' })
    res.render('landingpage', {loggedIn: true});
    // res.render('landingpage', { post, loggedIn: true });

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

router.get('/yourreviews', (req, res) => {
    res.render('yourreviews', {loggedIn: true});
})

router.get('/profilesettings', (req, res) => {
    res.render('profilesettings', {loggedIn: true});
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

module.exports = router;