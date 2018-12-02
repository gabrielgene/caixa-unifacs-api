const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  user: { type: Object },
  products: { type: Object },
  value: { type: String },
  change: { type: String },
});

module.exports = mongoose.model('History', HistorySchema);
