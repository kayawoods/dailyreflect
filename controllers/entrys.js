const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user._id);
      res.render('entrys/index.ejs', {
        entrys: currentUser.entrys,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/new', async (req, res) => {
    res.render('entrys/new.ejs');
  });

  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.entrys.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/entrys`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  // controllers/applications.js

router.get('/:entryId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const entry = currentUser.entrys.id(req.params.entryId);
      res.render('entrys/show.ejs', {
        entry: entry,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  router.delete('/:entryId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.entrys.id(req.params.entryId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/entrys`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  router.get('/:entryId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const entry = currentUser.entrys.id(req.params.entryId);
      res.render('entrys/edit.ejs', {
        entry: entry,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

module.exports = router;