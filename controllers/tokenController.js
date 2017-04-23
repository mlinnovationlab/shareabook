var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var tokenUtil = require('../utilities/tokenUtil');
var userUtil = require('../utilities/userUtil');

module.exports.post = function(req){
    var token = req.body.token;
    if(!token){
        throw new AppError("Token not validated", 401);
    }
    return tokenUtil.validateToken(token).then((userId)=>{
        return userUtil.getUser(userId);
    })
}