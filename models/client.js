const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String },
  picture: { type: String },
  cod: { type: String },
});

module.exports = mongoose.model('Client', ClientSchema);
