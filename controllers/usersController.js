var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var userUtil = require('../utilities/userUtil');

module.exports.put = function(req){
    var userId = req.params.userId;
    var apartmentNo = req.body.apartmentNumber;
    var contactNo = req.body.contactNumber;
    var communityId = req.body.communityId;
    var availability = req.body.availability;
    var children = req.body.children;
    var email = req.body.email;
    return User.findById(userId).exec().then((user)=>{
        if(!user){
            throw new AppError("User not found username:" + username, 404);
        }
        delete user._id;
        user.apartmentNumber = apartmentNo;
        user.contactNumber = contactNo;
        user.email = email;
        user.community = communityId;
        user.isProfileUpdated =  true;
        user.availability = availability;
        user.children = children;
        return User.findByIdAndUpdate(userId, user).exec();
    }).then(()=>{
        return userUtil.getUser(userId);
    })

}