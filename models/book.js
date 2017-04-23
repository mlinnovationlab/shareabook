var mongoose = require('mongoose');

var book = function () {

    var book = mongoose.Schema({
        title: { type: String, required: true },
        author: { type: String},
        isbn: { type: String },
        description: { type: String },
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requester: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        pastRequesters: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        coverImageURL: {type: String},
        status: {type: String},
        appropriateAge:String,
        bookCategories:[String],
        addedDateTime:{ type: Date, default: Date.now }
    });

    return mongoose.model('Book', book);
}

module.exports = new book();