'use strict';

angular.module('booksApp.nav', []).factory('navService', function($rootScope) {
        return {
            initNav:function(length){
                $rootScope.navItems = [];
                var i =  0
                while(i < length){
                    $rootScope.navItems.push("");
                    i++;
                }
            },
            setActiveNavItem:function(id){
                var navItems = $rootScope.navItems;
                for(var n in navItems){
                    if(n == id){
                        navItems[n] = "active";
                    }
                    else{
                        navItems[n] = "";
                    }
                }
            }
        }
});