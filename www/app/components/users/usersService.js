'use strict';

angular.module('booksApp.users', []).factory('usersService', function($http, authService) {
        return {
            updateUser:function(u) {
                console.log(u);
                return $http.put("/api/users/"+u._id, u, {headers: {'Authorization': authService.getToken()}});
            },
            getGroups:function() {
                return $http.get("/api/groups",{headers: {'Authorization': authService.getToken()}});
            }
        }
});