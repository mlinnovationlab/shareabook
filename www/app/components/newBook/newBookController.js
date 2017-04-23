'use strict';

angular.module('booksApp.newBook', []).controller('NewBookController', function($scope,
                                                                                $state,
                                                                                newBookService,
                                                                                authService,
                                                                                utilService) {

    $scope.searchBooks = [];
    //var searchedBookTemp = {
    //    author: "Jean-Marie Apostolid�s",
    //    coverImageURL: "http://books.google.com/books/content?id=8TizX-868GgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //    description: "The Metamorphoses of Tintin, a pioneering book first published in French in 1984, offers a complete analysis of Herg�'s legendary hero.",
    //    title: "The Metamorphoses of Tintin, Or, Tintin for Adults"
    //};
    //var searchedBookTemp2 = {
    //    author: "Jean-Marie Apostolid�2s",
    //    coverImageURL: "http://books.google.com/books/content?id=8TizX-868GgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //    description: "The Metamorphoses of Tintin, a pioneering book first published in French in 1984, offers a complete analysis of Herg�'s legendary hero.",
    //    title: "The Metamorphoses of Tintin, Or, Tintin for Adults"
    //};
    //$scope.searchBooks.push(searchedBookTemp);
    //$scope.searchBooks.push(searchedBookTemp2);

    $scope.ages = utilService.getChildAges();
    $scope.categories = utilService.formatCategoriesForView([]);

    $scope.newbook = {};
    $scope.newbooks = [];
    $scope.addNewBook = function(){
        $scope.errorMsg = null;
        var newBook = {
            userId:authService.getCurrentUser()._id,
            appropriateAge:$scope.newbook.age,
            bookCategories:utilService.formatCategoriesForDB($scope.categories)
        };
        if(!$scope.newbook.titleName || !$scope.newbook.authorName || newBook.bookCategories.length === 0 || !newBook.appropriateAge){
            $scope.errorMsg = "Please fill book title, author, age and categories";
            return;
        }
        newBook.books = [];
        $scope.newbooks.forEach(function (book) {
            var b = {
                title:book.title,
                author:book.author,
                description:book.description,
                coverImageURL:book.coverImageURL
            }
            newBook.books.push(b);
        })
        console.log(newBook);
        newBookService.addBook(newBook).success(function(){
            $state.go("my-books")
        }).error(function(err){
            console.log("add book error");
            console.log(err);
            $scope.errorMsg = err.toString();
        })
    }


    $scope.searchType = "title";
    $scope.searchBooksFn = function(){
        $scope.noSearchResult = false;
        $scope.searchBooks = [];
        if($scope.searchType == 'isbn'){
            $scope.searchValue = $scope.searchValue.split('-').join('');
        }
        newBookService.searchBooks($scope.searchType,$scope.searchValue).success(function(data){
            console.log(data);
            $scope.searchBooks = data.searchBooks;
            if(data.searchBooks && data.searchBooks.length == 0){
                $scope.noSearchResult = true;
            }
        }).error(function(err){
            console.log(err);
            console.log("error while searching booking isbn");
        })
    }

    $scope.selectSearchedBook = function(id){
        if(!$scope.searchBooks[id].selected){
            $scope.searchBooks[id].selected = true;
            $scope.newbooks.push($scope.searchBooks[id]);
        }
        else{
            delete $scope.searchBooks[id].selected;
            $scope.newbook = {};
            deselectBook($scope.searchBooks[id]);
        }
        var multipleSelectedText = "Multiple Selected ("+$scope.newbooks.length+")";
        if($scope.newbooks.length > 1){
            $scope.newbook.titleName = multipleSelectedText;
            $scope.newbook.authorName = multipleSelectedText;
            $scope.newbook.coverImageURL = null;
            $scope.newbook.description = multipleSelectedText;
        }
        else{
            $scope.newbook.titleName = $scope.newbooks[0].title;
            $scope.newbook.authorName = $scope.newbooks[0].author;
            $scope.newbook.coverImageURL = $scope.newbooks[0].coverImageURL;
            $scope.newbook.description = $scope.newbooks[0].description;
        }

        console.log($scope.newbooks);

    }

    $scope.formatBookDescription = function(desc){
        return utilService.truncateString(desc, 700);
    }

    function deselectBook(book){
        var i = null;
        for(var b in $scope.newbooks){
            if($scope.newbooks[b].author == book.author && $scope.newbooks[b].title == book.title){
                i = b;
                break;
            }
        }
        $scope.newbooks.splice(i,1);

    }
});