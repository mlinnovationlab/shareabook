'use strict';

angular.module('booksApp.outBookRequests', [])
    .controller('OutBookRequestsController', function ($scope,
                                                          $rootScope,
                                                          $state,
                                                       toastService,navService,
                                                          bookRequestsService) {

        $rootScope.inClass = "";
        $rootScope.outClass = "active";
        navService.setActiveNavItem(1);

        bookRequestsService.getOutRequests().success(function(data){
            $scope.requests = data.requests;
            console.log(data);
        }).error(function(err){
            console.log(err);
            console.log("error while req from me");
        });

        $scope.setStyle = function(status){
            return bookRequestsService.style.bookRequestStatusCSS[status];
        };

        $scope.requestActions = function(status){
            return bookRequestsService.outBookRequestActionsBasedOnStatus[status];
        };

        function cancelRequest(requestId){
            bookRequestsService.cancelRequest(requestId).success(function(){
                toastService.showInfo("Request cancelled successfully")
                $state.go($state.current, {}, {reload: true});
            }).error(function(err){
                console.log(err);
                console.log("error while cancel  ");
                toastService.showError("Cancel failed : "+err.message);
            })
        }

        function updateRequestToBorrowed(requestId){
            bookRequestsService.updateRequestToBorrowed(requestId).success(function(){
                toastService.showInfo("Request updated successfully")
                $state.go($state.current, {}, {reload: true});
            }).error(function(err){
                console.log(err);
                console.log("error while updateRequestAsBorrowed  ");
                toastService.showError("Update failed : "+err.message);
            })
        }

        $scope.performAction = function(actionName, requestId){
            console.log(actionName, requestId);
            if(actionName == bookRequestsService.actionNames.cancelRequest){
                cancelRequest(requestId);
            }
            else if(actionName == bookRequestsService.actionNames.updateRequestToBorrowed){
                updateRequestToBorrowed(requestId);
            }
        }

        $scope.showBook = function(bookId){
            $state.go('book-detail', {bookId:bookId});
        }

});