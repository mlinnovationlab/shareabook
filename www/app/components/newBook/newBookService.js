'use strict';

angular.module('booksApp.newBookService', []).factory('newBookService', function($http, authService) {
        return {
            addBook:function(book) {
                return $http.post("/api/users/"+book.userId+"/books", book , {headers: {'Authorization': authService.getToken()}});
            },
            searchBooks:function(key, value) {
                return $http.get("/api/searchBooks/"+key+"/"+value, {headers: {'Authorization': authService.getToken()}});
            }
        };
});