'use strict';

angular.module('booksApp.bookRequestsService', []).factory('bookRequestsService', function($http, authService) {

    var bookRequestStatusCSS={
            REQUESTED:"info",
            REQUEST_APPROVED:"warning",
            BORROWED:"warning",
            CANCELLED:"default",
            RETURNED:"default"
        };

    var inBookRequestActionsBasedOnStatus = {
        REQUESTED:[
            {
                actionName:"Approve Request",
                cssClass:"success",
                actionFnName:"approveRequest"
            }
        ],
        REQUEST_APPROVED:[
            {
                actionName:"Mark as Borrowed",
                cssClass:"warning",
                actionFnName:"updateRequestToBorrowed"
            },
            {
                actionName:"Mark as Returned",
                cssClass:"info",
                actionFnName:"updateRequestToReturned"
            }
        ],
        BORROWED:[
            {
                actionName:"Mark as Returned",
                cssClass:"info",
                actionFnName:"updateRequestToReturned"
            }
        ],
        RETURNED:[],

    };

    var outBookRequestActionsBasedOnStatus = {
        REQUESTED:[
            {
                actionName:"Cancel Request",
                cssClass:"default",
                actionFnName:"cancelRequest"
            }
        ],
        CANCELLED:[],
        BORROWED:[],
        RETURNED:[],
        REQUEST_APPROVED:[
            {
                actionName:"Mark as Borrowed",
                cssClass:"warning",
                actionFnName:"updateRequestToBorrowed"
            }
        ]

    }


    return {
            getInRequests:function() {
                var userId = authService.getCurrentUser()._id;
                return $http.get("/api/users/"+userId+"/InRequests" , {headers: {'Authorization': authService.getToken()}});
            },
            getOutRequests:function(){
                var userId = authService.getCurrentUser()._id;
                return $http.get("/api/users/"+userId+"/OutRequests",{headers: {'Authorization': authService.getToken()}});
            },
            cancelRequest:function(requestId){
                return $http.put("/api/cancelRequest/"+requestId,{},{headers: {'Authorization': authService.getToken()}});
            },
            approveRequest:function(requestId){
                return $http.put("/api/approveRequest/"+requestId,{},{headers: {'Authorization': authService.getToken()}});
            },
            updateRequestToBorrowed:function(requestId){
                return $http.put("/api/updateRequestToBorrowed/"+requestId,{},{headers: {'Authorization': authService.getToken()}});
            },
            updateRequestToReturned:function(requestId){
                return $http.put("/api/updateRequestToReturned/"+requestId,{},{headers: {'Authorization': authService.getToken()}});
            },
            style:{
                bookRequestStatusCSS:bookRequestStatusCSS
            },
            actionNames:{
                cancelRequest:"cancelRequest",
                approveRequest:"approveRequest",
                updateRequestToBorrowed:"updateRequestToBorrowed",
                updateRequestToReturned:"updateRequestToReturned"
            },
            inBookRequestActionsBasedOnStatus:inBookRequestActionsBasedOnStatus,
            outBookRequestActionsBasedOnStatus:outBookRequestActionsBasedOnStatus
        }
});