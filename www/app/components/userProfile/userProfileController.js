'use strict';

angular.module('booksApp.userProfile', []).controller('UserProfileController', function ($scope,
                                                                               $state,
                                                                               authService,
                                                                               usersService,
                                                                               utilService,
                                                                               navService) {

    navService.setActiveNavItem(2);
    $scope.times = utilService.getTimes();
    $scope.ages = utilService.getChildAges();
    $scope.categories = utilService.getBookCategories();

    $scope.user = authService.getCurrentUser();
    if(!$scope.user.children){
        $scope.user.children = [];
    }
    if ($scope.user.children.length === 0) {
        addEmptyChild();
    }
    $scope.user.children.forEach(function (child) {
        if (child.age) {
            child.age = child.age.toString();
        }
        child.preferredBookCategories = utilService.formatCategoriesForView(child.preferredBookCategories);
    });

    console.log($scope.user);
    var communitiesIds = [];
    $scope.updateUser = function () {
        if(!validateInput()){
            return
        }
        $scope.user.communityId = getCommunityId($scope.user.community.name);
        $scope.user.children.forEach(function (child) {
            child.preferredBookCategories = utilService.formatCategoriesForDB(child.preferredBookCategories);
        })
        console.log($scope.user);
        usersService.updateUser($scope.user).success(function (data) {
            authService.setCurrentUser(data);
            $state.go("books");
        }).error(function (data, status) {
            console.log(data, status);
        });
    }

    $scope.communities = ["Loading"];
    usersService.getGroups().success(function (data) {
        $scope.communities = [];
        for (var i in data) {
            $scope.communities.push(data[i].name);
            communitiesIds.push(data[i]._id);
        }
    }).error(function (err) {
        console.log("err while loading groups");
        console.log(err);
    })

    function getCommunityId(communityName) {
        var id = $scope.communities.indexOf(communityName);
        return communitiesIds[id];
    }

    $scope.addChild = function () {
        addEmptyChild()
    }
    $scope.removeChild = function (id) {
        $scope.user.children.splice(id, 1);
        if($scope.user.children && $scope.user.children.length == 0){
            addEmptyChild();
        }

    }

    function addEmptyChild() {
        var categories = [];
        for (var c in $scope.categories) {
            categories.push({
                name: $scope.categories[c]
            });
        }
        $scope.user.children.push({preferredBookCategories: categories});
    }

    function validateInput(){
        $scope.errorMsg = null;
        var user = $scope.user;
        var isAgeNull = false
        for(var i in user.children){
            if(!user.children[i].age){
                isAgeNull = true
                user.children.splice(i, 1);
            }
        }
        if(!user.email || !(user.community && user.community.name)){
            $scope.errorMsg = "Please fill the mandatory (* marked) fields to proceed"
            return false
        }
        return true
    }

});