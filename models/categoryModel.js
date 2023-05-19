const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },

  
postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
