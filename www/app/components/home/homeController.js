'use strict';

angular.module('booksApp.home', []).controller('HomeController', function($scope, $state, $auth, authService) {


    $scope.loginWithGoogle = function(){
        handleLogin($auth.authenticate('google'));
    };
    $scope.loginWithFb = function(){
        handleLogin($auth.authenticate('facebook'));
    };

    var handleLogin = function(authPromise){
        authPromise.then(function(response){
            console.log(response.data);
            authService.setCurrentUser(response.data.user);
            authService.setToken(response.data.token);
            if(response.data.user.isProfileUpdated){
                $state.go("books");
            }
            else{
                $state.go("profile");
            }
        }).catch(function(err){
            console.log(err);
            $state.go("home");
        });
    }
});