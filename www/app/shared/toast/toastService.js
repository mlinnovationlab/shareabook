'use strict';

angular.module('booksApp.toast', []).factory('toastService', function(ngNotify) {
    return {
        showInfo:function(msg){
            ngNotify.set(msg);
        },
        showError:function(msg){
            ngNotify.set(msg,'error');
        }
    }
});