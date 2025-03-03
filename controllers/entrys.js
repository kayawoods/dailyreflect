const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Prompt = require('../models/prompt.js')

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
  const prompts = await Prompt.find()
  const currentPrompt = prompts[Math.floor(Math.random() * prompts.length)]
  console.log(currentPrompt)
  res.render('entrys/new.ejs', {
    prompt: currentPrompt
  });
});

router.post('/', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);

    const { entry, public, prompt, date } = req.body
    const newEntry = {
      date: new Date(date),
      entry,
      public,
      prompt: prompt
    }
    currentUser.entrys.push(newEntry)
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/entrys`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }

});



router.get('/:entryId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id).populate('entrys.prompt');
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
    res.redirect('/users');
  }
});




router.put('/:entryId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const entry = currentUser.entrys.id(req.params.entryId);

    if (entry) {
      entry.set(req.body);
      await currentUser.save();
    }

    res.redirect(`/users/${currentUser._id}/entrys`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});





module.exports = router;




