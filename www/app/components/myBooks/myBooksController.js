'use strict';

angular.module('booksApp.myBooks', []).controller('MyBooksController', function ($scope,
                                                                                 $rootScope,
                                                                                 $state,
                                                                                 navService,
                                                                                 myBooksService,
                                                                                 authService,
                                                                                 toastService,
                                                                                 utilService,
                                                                                 dialogService,
                                                                                 bookDetailService) {


    navService.setActiveNavItem(0);
    $scope.goToAddBookPage = function () {
        $state.go("new-book");
    };

    myBooksService.getBooksByUserId(authService.getCurrentUser()._id).success(function(data){
        $scope.books = data.books;
        console.log(data);
    }).error(function(err){
        console.log("error get mybooks");
        console.log(err);
    });

    $scope.viewBookDetails = function (bookId) {
        $state.go('book-detail', {bookId: bookId});
    };

    $scope.editBook = function (bookId) {
        $state.go('book-edit', {bookId: bookId});
    };

    $scope.deleteBook = function (book) {
        $state.go($state.current, {}, {reload: true});
        dialogService.showDeleteConfirmation(book);
    }

    $scope.showOptions = function (bookId) {
        $scope.options = {};
        $scope.options[bookId] = true;
    }

    $scope.hideOptions = function () {
        $scope.options = {};
    }

    $scope.formatBookDescription = function(desc){
        return utilService.truncateString(desc, 350);
    }

    $scope.formatBookTitle = function(title){
        return utilService.truncateString(title, 50);
    }

    $scope.searchMyBooks = function(){
        return function( item ) {
            var searchText = $scope.searchText;
            if(!searchText){
                return true
            }
            searchText = searchText.toLowerCase();
            return item.title.toLowerCase().indexOf(searchText) > -1 || item.author.toLowerCase().indexOf(searchText) > -1;
        };
    }



});