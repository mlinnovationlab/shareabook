var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var Book = require('../models/book');

module.exports.post = function(req){
    var updateBookPromises = [];
    Book.find().lean().exec().then((books)=>{

        books.forEach(function(book){
            var bookId = book._id;
            delete book._id;
            book.appropriateAge = book.appropriateAge+"";
            var updatePromise = Book.findByIdAndUpdate(bookId, {$set:book}).exec();
            updateBookPromises.push(updatePromise);
        })

        return q.all(updateBookPromises);
    });
}