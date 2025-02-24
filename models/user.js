const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
  },
});

const entrySchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  entry: {
    type: String,
    maxlength: 1, 
  },
  public: {
    type: Boolean,
    default: false,
  },
  prompt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prompt',
  },
});


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
const Entry = mongoose.model('Entry', entrySchema);
const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = User;
