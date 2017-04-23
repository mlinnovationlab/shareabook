'use strict';

angular.module('booksApp.bookEditService', []).factory('bookEditService', function($http, authService) {
        return {
            updateBook:function(book) {
                return $http.put("/api/books/"+book._id,book,{headers: {'Authorization': authService.getToken()}});
            }
        };
});