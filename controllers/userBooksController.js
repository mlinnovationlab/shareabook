var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var Book = require('../models/book');
var tokenUtil = require('../utilities/tokenUtil');

module.exports.post = function(req){
    var userId = req.params.userId;
    var books = req.body.books;
    var defaultAge = req.body.appropriateAge;
    var defaultCategories = req.body.bookCategories;
    var savePromises = [];
    books.forEach(function(newBook){
        var title = newBook.title;
        var author = newBook.author;
        var coverImageURL = newBook.coverImageURL;
        var description = newBook.description;
        var age = newBook.appropriateAge || defaultAge;
        var categories = newBook.bookCategories || defaultCategories;
        var book = new Book({
            owner:userId,
            title:title,
            author:author,
            description:description,
            coverImageURL:coverImageURL,
            status:appConfig.bookStatus.free,
            appropriateAge:age,
            bookCategories:categories
        });

        savePromises.push(book.save());
    });

    return q.all(savePromises).then(()=>{
        return q.when();
    });
};

module.exports.get = function(req){
    var userId = req.params.userId;
    return Book.find({owner:userId}).exec().then((books)=>{
        return q.when({
            userId:userId,
            books:books
        })
    })
};