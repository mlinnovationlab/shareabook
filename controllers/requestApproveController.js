var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var Book = require('../models/book');
var BookRequest = require('../models/bookRequest');
var tokenUtil = require('../utilities/tokenUtil');

module.exports.put = function(req){
    var requestId = req.params.requestId;
    var bookId = null;
    return BookRequest.findById(requestId).exec().then((bookRequest)=>{
        if(!bookRequest){
            throw new AppError("bookRequest id is not valid :"+requestId, 401)
        }
        delete bookRequest._id;
        bookId = bookRequest.book;
        bookRequest.status = appConfig.bookRequestStatus.requestApproved;
        return BookRequest.update({_id:requestId}, bookRequest).exec();
    }).then(()=> {
        return Book.findById(bookId).exec();
    }).then((book)=>{
        delete book._id;
        book.status = appConfig.bookStatus.requestApproved;
        return Book.update({_id:bookId}, book).exec();
    }).then(()=>{
        return q.when();
    })
};