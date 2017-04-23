var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var Book = require('../models/book');
var tokenUtil = require('../utilities/tokenUtil');

module.exports.get = function(req){
    var excludeUserId = req.query.excludeUserId;
    var result = {};
    var ages = [];
    var categories = [];
    var showAllBooks = req.query.showAllBooks === "true";

    if( req.query.ages){
        ages = req.query.ages.split(",");
    }
    if( req.query.categories){
        categories = req.query.categories.split(",");
    }

    result.filters = {
        age:ages,
        categories:categories
    };

    var filter = {
        owner:{$ne:excludeUserId},
        $or:[
            {status:appConfig.bookStatus.free},
            {requester:excludeUserId}
        ]
    };
    if(!showAllBooks){
        filter.appropriateAge = {
            $in:ages
        }
        filter.bookCategories = {
            $in:categories
        }

    }

    return Book.find(filter).populate("owner").sort({addedDateTime: -1}).lean().exec().then((books)=>{
        var resultBooks = [];
        var latestBooks = [];
        var i = 0;
        books.forEach(function(book){
            if(book.requester == excludeUserId){
                book.hasRequested = true
            }
            if(book.pastRequesters && book.pastRequesters.length > 0){
                for(var r in book.pastRequesters){
                    if(book.pastRequesters[r] == excludeUserId){
                        book.hasRead = true;
                        break;
                    }
                }

            }
            if(!book.owner.isActive){
                return;
            }
            if(i < appConfig.newAddedBookCount){
                latestBooks.push(book);
                i++;
                return;
            }
            resultBooks.push(book);
        })
        resultBooks.sort(function(a, b){
            if(a.title < b.title) return -1;
            if(a.title > b.title) return 1;
            return 0;
        });
        result.books = resultBooks;
        result.newBooks = latestBooks;
        return q.when(result);
    })
};