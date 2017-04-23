var q = require('q');
var appConfig = require('../config/appConfig');
var AppError = require('../models/error');
var User = require('../models/user');
var notificationUtil = require('../utilities/notificationUtil');

module.exports.getUser = function(userId){
    var user = {};
    return User.findById(userId).lean().populate("community").exec().then((userRes)=>{
        user = userRes;
        return notificationUtil.getNotificationCount(user._id);
    }).then((notifications)=>{
        user.notifications = notifications;
        return q.when(user);
    })
}