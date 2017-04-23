'use strict';

angular.module('booksApp.auth', []).factory('authService', function($rootScope, $http) {
        var currentUser = null;

        return {
            setCurrentUser:function(u){
                currentUser = u;
                $rootScope.currentUser = currentUser;
            },
            getCurrentUser:function(){
                return currentUser;
            },
            setToken:function(token){
                sessionStorage.token = token;
            },
            getToken:function(){
                return sessionStorage.token;
            },
            validateToken:function(token){
                return $http.post("/api/validateToken", {token:token});
            }

        };
});