const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  question: {
    type: String,
  },

});



const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;

