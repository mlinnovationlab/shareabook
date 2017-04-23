'use strict';

angular.module('booksApp.util', []).factory('utilService', function() {
    var ages = [
        "<5","5-10","10-15",">15"
    ]
    var categories = [
        "Fiction", "Non Fiction","Puzzles"
    ]

    function truncateString(string, maxSize){
        if(string.length < maxSize){
            return string;
        }
        var small = string.substring(0,maxSize);
        return small+"...";
    }
    return {
            getTimes:function(){
                return [
                    "01:00 AM",
                    "02:00 AM",
                    "03:00 AM",
                    "04:00 AM",
                    "05:00 AM",
                    "06:00 AM",
                    "07:00 AM",
                    "08:00 AM",
                    "09:00 AM",
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 NOON",
                    "01:00 PM",
                    "02:00 PM",
                    "03:00 PM",
                    "04:00 PM",
                    "05:00 PM",
                    "06:00 PM",
                    "07:00 PM",
                    "08:00 PM",
                    "09:00 PM",
                    "10:00 PM",
                    "11:00 PM",
                    "12:00 NIGHT"
                ]
            },
            getChildAges:function(){
                return ages;
            },
            getBookCategories:function(){
                return categories
            },
            formatCategoriesForDB:function(uiValues){
                var values = [];
                uiValues.forEach(function(item){
                    if(item && item.enabled){
                        values.push(item.name);
                    }
                });

                return values;
            },
            formatCategoriesForView:function(dbValues){
                var values = [];
                categories.forEach(function(c){
                    var isFound = false;
                    dbValues.forEach(function(i){
                        if(c == i){
                            isFound = true
                        }
                    })

                    values.push({
                        name:c,
                        enabled:isFound
                    })
                });

                return values;
            },
            formatAgesForView:function(dbValues){
                var fullList = ages;
                var formattedList = [];
                fullList.forEach(function(fullItem){
                    var isFound = false;
                    dbValues.forEach(function(enabledListItem){
                        if(fullItem == enabledListItem){
                            isFound = true
                        }
                    })
                    var formattedItem = {
                        name:fullItem,
                        enabled:isFound
                    }
                    formattedList.push(formattedItem);
                });
                return formattedList;
            },
            formatAgesForDB:function(uiValues){
                var values = [];
                uiValues.forEach(function(item){
                    if(item && item.enabled){
                        values.push(item.name);
                    }
                });

                return values;
            },
            truncateString:truncateString
        }
});