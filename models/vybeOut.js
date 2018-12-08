const mongoose = require('mongoose');
const mongodbURI = require('../config/config');

mongoose.connect(mongodbURI);
const userSchema = new mongoose.Schema({
  Author: String,
  BeatName: String,
  Beat: String,
  Tempo: String,
  Contribute: Boolean,
});

module.exports = mongoose.model('User', userSchema);
