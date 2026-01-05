const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    CategoryName: {
        type: String,
        required: true
    }
}, {
    collection: 'Category'
});

module.exports = mongoose.model('Category', CategorySchema);