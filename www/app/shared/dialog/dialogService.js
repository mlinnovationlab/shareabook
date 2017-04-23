'use strict';

angular.module('booksApp.dialog', []).factory('dialogService', function(ngDialog) {
    return {
        showDeleteConfirmation:function(book, deleteFn){
            ngDialog.open({
                template: 'shared/dialog/deleteConfirmationDialog.html',
                controller: function($scope, bookDetailService, toastService, $state) {
                    $scope.book = book;
                    $scope.deleteBook = function(){
                        bookDetailService.deleteBook(book._id).success(function(){
                            toastService.showInfo("Book deleted");
                            ngDialog.close();
                            $state.go($state.current, {}, {reload: true});
                        }).error(function(err){
                            toastService.showError("Deletion failed : "+err.message,'error');
                            console.log(err)
                        })
                    }
                }
            });
        }
    }
});