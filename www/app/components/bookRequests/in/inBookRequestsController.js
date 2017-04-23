'use strict';

angular.module('booksApp.inBookRequests', [])
    .controller('InBookRequestsController', function ($rootScope, $scope, $state,
                                                      toastService,navService,
                                                        bookRequestsService) {


        $rootScope.inClass = "active";
        $rootScope.outClass = "";
        navService.setActiveNavItem(1);


        bookRequestsService.getInRequests().success(function(data){
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
            return bookRequestsService.inBookRequestActionsBasedOnStatus[status];
        };

        function approveRequest(requestId){
            bookRequestsService.approveRequest(requestId).success(function(){
                toastService.showInfo("Request approve successfully")
                $state.go($state.current, {}, {reload: true});
            }).error(function(err){
                console.log(err);
                console.log("error while approve  ");
                toastService.showError("Approve failed :"+err.message);
            })
        }

        function updateRequestToBorrowed(requestId){
            bookRequestsService.updateRequestToBorrowed(requestId).success(function(){
                toastService.showInfo("Request updated successfully")
                $state.go($state.current, {}, {reload: true});
            }).error(function(err){
                console.log(err);
                console.log("error while updateRequestAsBorrowed  ");
            })
        }

        function updateRequestToReturned(requestId){
            bookRequestsService.updateRequestToReturned(requestId).success(function(){
                toastService.showInfo("Request updated successfully")
                $state.go($state.current, {}, {reload: true});
            }).error(function(err){
                console.log(err);
                console.log("error while updateRequestAsReturned  ");
                toastService.showError("Update failed : "+err.message);
            })
        }

        $scope.performAction = function(actionName, requestId){
            console.log(actionName, requestId);
            if(actionName == bookRequestsService.actionNames.approveRequest){
                approveRequest(requestId);
            }
            else if(actionName == bookRequestsService.actionNames.updateRequestToBorrowed){
                updateRequestToBorrowed(requestId);
            }
            else if(actionName == bookRequestsService.actionNames.updateRequestToReturned){
                updateRequestToReturned(requestId);
            }
        }

        $scope.showBook = function(bookId){
            $state.go('book-detail', {bookId:bookId});
        }

    });