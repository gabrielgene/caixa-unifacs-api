const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  picture: { type: String },
  price: { type: Number },
  cod: { type: String },
  amount: { type: Number },
});

module.exports = mongoose.model('Product', ProductSchema);
