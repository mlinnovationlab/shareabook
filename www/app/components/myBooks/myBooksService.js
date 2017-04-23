'use strict';

angular.module('booksApp.myBooksService', []).factory('myBooksService', function($http, authService) {
        return {
            getBooksByUserId:function(userId) {
                return $http.get("/api/users/"+userId+"/books" , {headers: {'Authorization': authService.getToken()}});
            }
        };
});