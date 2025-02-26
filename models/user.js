const mongoose = require('mongoose');


const entrySchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  entry: {
    type: String,
    // maxlength: 1, 
  },
  public: {
    type: String,
    enum: ['Vault', 'Share'],
  },
  prompt: {
    type: mongoose.Schema.Types.ObjectId, //need populate to show more 
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
  entrys: [entrySchema],
});

const User = mongoose.model('User', userSchema);



module.exports = User;
