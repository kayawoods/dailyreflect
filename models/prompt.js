const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
  },
});



const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;

//might use in future. potentially delete database 