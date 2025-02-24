const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/index.ejs', { users: allUsers });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Get a single user and show their pantry
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        res.render('users/show.ejs', { user, entrys: user.entrys }); // Pass user data to show.ejs
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;