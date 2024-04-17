const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
          },
          description: {
            type: String
          },
    },
);

module.exports = mongoose.model('Category', CategorySchema);