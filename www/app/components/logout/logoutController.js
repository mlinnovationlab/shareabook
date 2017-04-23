'use strict';

angular.module('booksApp.logout', []).controller('LogoutController', function($state, authService) {

    authService.setCurrentUser(null);
    authService.setToken(null);
    $state.go("home");

});