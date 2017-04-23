var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var Book = require('../models/book');
var BookRequest = require('../models/bookRequest');
var emailUtil = require('../utilities/emailUtil');

module.exports.put = function(req){
    var bookId = req.body.bookId;
    var requesterId = req.body.requesterId;
    var ownerId = null
    return Book.findById(bookId).exec().then((book)=>{
        if(!book){
            throw new AppError("Book id is not valid :"+bookId, 401)
        }
        delete book._id;
        ownerId = book.owner;
        book.status = appConfig.bookRequestStatus.requested;
        book.requester = requesterId;
        return Book.update({_id:bookId}, book).exec();
    }).then(()=>{
        var request = new BookRequest({
            book:bookId,
            requester:requesterId,
            owner:ownerId,
            status:appConfig.bookRequestStatus.requested
        })
        return request.save();
    }).then((savedRequest)=>{
        emailUtil.sendNewRequestEmail(savedRequest._id);
        return q.when();
    });
};