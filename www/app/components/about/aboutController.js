'use strict';

angular.module('booksApp.about', []).controller('AboutController', function(navService) {

    navService.setActiveNavItem(3);
});