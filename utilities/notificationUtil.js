var q = require('q');
var appConfig = require('../config/appConfig');
var AppError = require('../models/error');
var BookRequest = require('../models/bookRequest');

module.exports.getNotificationCount = function(userId){
    var result = {};
    result.myRequests = {};
    return BookRequest.find({owner:userId,status:appConfig.bookRequestStatus.requested})
        .exec().then((requests)=>{
            result.myRequests.inRequests = requests.length;
            return q.when(result)
    })
}