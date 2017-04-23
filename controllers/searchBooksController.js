var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var Book = require('../models/book');
var booksClient = require('../utilities/booksClient');

module.exports.get = function(req){

    var key = req.params.key;
    var value = req.params.value;
    var promise = null;

    if(key == 'isbn'){
        promise = booksClient.searchBooksByISBN(value);
    }
    else if(key == 'author'){
        promise = booksClient.searchBooksByAuthor(value);
    }
    else if(key == 'title'){
        promise = booksClient.searchBooksByTitle(value);
    }
    return promise.then((data)=>{
        return q.when({
            searchBooks:data
        })
    });

};