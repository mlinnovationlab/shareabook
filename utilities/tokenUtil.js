var Token = require('../models/token');
var jwt = require('jsonwebtoken');
var q = require('q');
var appConfig = require('../config/appConfig');
var AppError = require('../models/error');

module.exports.generateToken = function(userId){
    var token = jwt.sign({ userId:userId}, appConfig.tokenKey);
    var newToken = {
        token:token
    }
    return Token.update({userId:userId},newToken, {upsert: true}).exec().then(()=>{
        return q.when(token);
    });
}

module.exports.validateToken = function(token){

    function throwInvalidToken(){
        throw new AppError("Token not verified", 401);
    }

    return Token.findOne({token:token}).exec().then((userWithToken)=>{

        if(!userWithToken){
            throwInvalidToken();
        }

        var decodedToken = jwt.verify(token, appConfig.tokenKey);
        if(!decodedToken){
            throwInvalidToken();
        }
        if(decodedToken.userId != userWithToken.userId){
            throwInvalidToken();
        }
        return q.when(decodedToken.userId);
    });
}