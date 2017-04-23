'use strict';

angular.module('booksApp.books', []).controller('BooksController', function($scope,
                                                                            $state,
                                                                            authService,
                                                                            booksService,
                                                                            navService,
                                                                            utilService) {

    navService.setActiveNavItem(-1);

    var defaultFilters = {};
    defaultFilters.ages = [];
    defaultFilters.categories = [];
    if(authService.getCurrentUser().children && authService.getCurrentUser().children.length === 0){
        $scope.showAllBooks = true;
    }
    if(authService.getCurrentUser().children){
        authService.getCurrentUser().children.forEach(function(child){
            defaultFilters.ages.push(child.age);
            child.preferredBookCategories.forEach(function(cat){
                defaultFilters.categories.push(cat);
            });
        });
    }

    getBooks(defaultFilters);

    function getBooks(customerFilters){
        booksService.getBooks($scope.showAllBooks,customerFilters.ages, customerFilters.categories).success(function(data){
            $scope.books = data.books;
            $scope.newBooks = data.newBooks;
            var agefilter = data.filters.age;
            var categoryfilter = data.filters.categories;

            $scope.filterAge = utilService.formatAgesForView(agefilter);
            $scope.filterCategory = utilService.formatCategoriesForView(categoryfilter);

            console.log($scope.books)

        }).error(function(err){
            console.log("error get books");
            console.log(err);
        })
    }


    $scope.viewBookDetails = function(bookId){
        $state.go('book-detail', {bookId:bookId});
    }


    $scope.selectAllAges = function(){
        $scope.filterAge.forEach(function(age){
            age.enabled = true;
        })
    }

    $scope.selectAllCategories = function(){
        $scope.filterCategory.forEach(function(age){
            age.enabled = true;
        })
    }

    $scope.searchWithFilters = function(){
        var customFilters = {};
        customFilters.ages = utilService.formatAgesForDB($scope.filterAge);
        customFilters.categories = utilService.formatCategoriesForDB($scope.filterCategory);
        console.log(customFilters);
        getBooks(customFilters);
    }

    $scope.showOptions = function (bookId) {
        $scope.options = {};
        $scope.options[bookId] = true;
    }

    $scope.hideOptions = function () {
        $scope.options = {};
    }

    $scope.formatBookDescription = function(desc){
        return utilService.truncateString(desc, 270);
    }

    $scope.formatBookTitle = function(title){
        return utilService.truncateString(title, 50);
    }

    $scope.searchBooks = function(){
        return function( item ) {
            var searchText = $scope.searchText;
            if(!searchText){
                return true
            }
            searchText = searchText.toLowerCase();
            return item.title.toLowerCase().indexOf(searchText) > -1 || item.author.toLowerCase().indexOf(searchText) > -1;
        };
    }

    $scope.setShowAllBooks = function(){
        if($scope.showAllBooks){
            $scope.filterAge = utilService.formatAgesForView([]);
            $scope.filterCategory = utilService.formatCategoriesForView([]);
        }

    }

    $scope.flipCard = function(event, bookId){
        event.stopPropagation();
        console.log(bookId);
        $scope.cards = {};
        $scope.cards[bookId] = true;
        //$state.go($state.current, {}, {reload: true});
    }
    $scope.isFlipped = function(bookId){
        if(!$scope.cards){
            return false;
        }
        return  $scope.cards[bookId];
    }

    $scope.unFlipCard = function(event, bookId){
        event.stopPropagation();
        console.log(bookId);
        $scope.cards = {};
        //$state.go($state.current, {}, {reload: true});
    }

});