const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number
});

const Books = mongoose.model('Books', schema);

module.exports = Books;
