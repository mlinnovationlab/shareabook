'use strict';

angular.module('booksApp.bookEdit', []).controller('BookEditController', function ($scope,
                                                                                   $state,
                                                                                   $stateParams,
                                                                                   bookEditService,
                                                                                   bookDetailService,
                                                                                   authService,
                                                                                   toastService,
                                                                                   utilService) {

    var bookId = $stateParams.bookId;

    $scope.ages = utilService.getChildAges();

    $scope.isMyBook = false;
    bookDetailService.getBookDetails(bookId).success(function (data) {
        $scope.book = data;
        if(data.appropriateAge){
            $scope.book.appropriateAge = data.appropriateAge.toString();
        }
        if(!data.bookCategories){
            data.bookCategories = [];
        }
        $scope.categories = utilService.formatCategoriesForView(data.bookCategories);
        console.log($scope.book.owner._id, authService.getCurrentUser()._id);
        if ($scope.book.owner._id === authService.getCurrentUser()._id) {
            $scope.isMyBook = true;
        }
        console.log(data);
    }).error(function (err) {
        console.log("err when get book details");
        console.log(err);
    });

    $scope.updateBook = function () {
        $scope.book.bookCategories = utilService.formatCategoriesForDB($scope.categories);
        console.log($scope.book);
        bookEditService.updateBook($scope.book).success(function () {
            $state.go('my-books');
            toastService.showInfo("Book updated successfully")
        }).error(function (err) {
            console.log("error requesing book");
            console.log(err);
            toastService.showError("Update failed :"+err.message);
        })
    }

});