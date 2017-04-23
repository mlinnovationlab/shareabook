'use strict';

angular.module('booksApp.booksService', []).factory('booksService', function($http, authService) {
        return {
            getBooks:function(showAllBooks, ages, categories) {
                return $http.get("/api/books?excludeUserId="+authService.getCurrentUser()._id+
                    "&ages="+ages.join()+"&categories="+categories.join()+
                    "&showAllBooks="+showAllBooks,
                    {headers: {'Authorization': authService.getToken()}});
            }
        };
});