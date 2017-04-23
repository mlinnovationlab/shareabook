var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var request = require('request');

module.exports.searchBooksByISBN = function(isbn){
    return searchBooksKey("isbn",isbn);
}
module.exports.searchBooksByAuthor = function(author){
    return searchBooksKey("inauthor",author);
}
module.exports.searchBooksByTitle = function(title){
    return searchBooksKey("intitle",title);
}

function searchBooksKey(key, value){

    var booksAPISearchURL = appConfig.bookSearch.externalAPIUrl;

    return q.Promise((resolve, reject)=>{

        var params = {
            q:key+":"+value,
            maxResults:40,
            key:appConfig.googleBooksAPIKey
        }

        request.get({ url: booksAPISearchURL, qs: params, json: true }, function(err, response, data) {
            if (response.statusCode !== 200) {
                reject(new AppError("Error with the code "+data.error.message, 401))
            }
            else{
                var searchBooks = [];
                if(!(data && data.items && data.items.length > 0)){
                    resolve(searchBooks);
                }

                for(var b in  data.items){
                    var bookItem = data.items[b];
                    var authors = bookItem.volumeInfo.authors;
                    var imageURL = bookItem.volumeInfo.imageLinks;
                    var description = bookItem.volumeInfo.description;
                    var book = {
                        title:bookItem.volumeInfo.title,
                        author:"",
                        coverImageURL:"",
                        description:""
                    }
                    if(authors){
                        book.author = authors.join();
                    }
                    if(imageURL){
                        book.coverImageURL = imageURL.thumbnail;
                    }
                    if(description){
                        book.description = description;
                    }
                    searchBooks.push(book);
                }
                resolve(searchBooks);
            }
        });

    })
};