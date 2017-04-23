'use strict';

angular.module('booksApp.bookDetailService', []).factory('bookDetailService', function($http, authService) {
        return {
            getBookDetails:function(bookId) {
                return $http.get("/api/books/"+bookId , {headers: {'Authorization': authService.getToken()}});
            },
            requestBook:function(bookId){
                var payload = {
                    bookId:bookId,
                    requesterId:authService.getCurrentUser()._id
                }
                return $http.put("/api/bookRequest",payload,{headers: {'Authorization': authService.getToken()}});
            },
            deleteBook:function(bookId) {
                return $http.delete("/api/books/"+bookId , {headers: {'Authorization': authService.getToken()}});
            },
        }
});