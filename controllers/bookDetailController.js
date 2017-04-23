var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var Book = require('../models/book');
var tokenUtil = require('../utilities/tokenUtil');

module.exports.get = function(req){
    var bookId = req.params.bookId;
    return Book.findOne({_id:bookId}).populate('owner').populate('requester').lean().exec().then((book)=>{
        book.isAvaliable = false;
        if(book.status == appConfig.bookStatus.free) {
            book.isAvaliable = true;
        }
        return q.when(book);
    })
};

module.exports.put = function(req){
    var bookId = req.params.bookId;
    var title = req.body.title;
    var author = req.body.author;
    var coverImageURL = req.body.coverImageURL;
    var description = req.body.description;
    var age = req.body.appropriateAge;
    var categories = req.body.bookCategories;
    var book = {
        title:title,
        author:author,
        description:description,
        coverImageURL:coverImageURL,
        appropriateAge:age,
        bookCategories:categories
    };
    return Book.findByIdAndUpdate(bookId, {$set:book}).exec().then(()=>{
        return q.when();
    });
};

module.exports.delete = function(req){
    var bookId = req.params.bookId;
    return Book.findById(bookId).then((book)=>{
        if(!book){
            throw new AppError("Book id is not valid :"+bookId, 400);
        }
        if(book.status != appConfig.bookStatus.free){
            throw new AppError("You can not remove a requested book", 400)
        }
        return Book.findById(bookId).remove().exec();
    }).then(()=>{
        return q.when();
    })
}