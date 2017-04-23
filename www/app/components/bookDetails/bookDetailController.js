'use strict';

angular.module('booksApp.bookDetail', []).controller('BookDetailController', function($scope, $state,
                                                                                      toastService,
                                                                                      $stateParams,
                                                                                      utilService,
                                                                                      bookDetailService,
                                                                                      authService) {

    var bookId = $stateParams.bookId;
    $scope.isMyBook = false;
    bookDetailService.getBookDetails(bookId).success(function(data){
        $scope.book = data;
        if(data.description && isDescriptionLong(data.description)){
            data.showMoreBtn = true;
            data.showLessBtn = false;
            data.descriptionLess = formatDescription(data.description);
        }
        else{
            data.descriptionNormal = true;
        }
        console.log($scope.book.owner._id, authService.getCurrentUser()._id);
        if($scope.book.owner._id === authService.getCurrentUser()._id){
            $scope.isMyBook = true;
        }
        console.log(data);
    }).error(function(err){
        console.log("err when get book details");
        console.log(err);
    });

    $scope.requestBook = function(){
        bookDetailService.requestBook(bookId).success(function(){
            toastService.showInfo("Your request was successful");
            $state.go('book-requests.out');
        }).error(function(err){
            console.log("error requesing book");
            console.log(err);
            toastService.showError("Request failed : "+err.message);
        })
    }

    $scope.gotoEdit = function(){
        $state.go("book-edit",{bookId:bookId})
    }

    $scope.deleteBook = function(){
        bookDetailService.deleteBook(bookId).success(function(){
            toastService.showInfo("Book deleted");
            $state.go("my-books");
        }).error(function(err){
            toastService.showError("Deletion failed : "+err.message,'error');
            console.log(err);
        })
    }

    $scope.showLess = function(){
        $scope.book.showLessBtn = false;
        $scope.book.showMoreBtn = true;
    }

    $scope.showMore = function(){
        $scope.book.showLessBtn = true;
        $scope.book.showMoreBtn = false;
    }

    function isDescriptionLong(desc){
        return desc.length > 300;
    }

    function formatDescription(desc){
        return utilService.truncateString(desc, 300);
    }

});