var AppError = require('../models/error');
var q = require('q');
var request = require('request');
var appConfig = require('../config/appConfig');
var User = require('../models/user');
var tokenUtil = require('../utilities/tokenUtil');
var notificationUtil = require('../utilities/notificationUtil');

module.exports.post = function(req){

    var fields = ['id', 'email', 'first_name', 'last_name', 'picture', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: appConfig.auth.facebook.client_secret,
        redirect_uri: req.body.redirectUri
    };

    var profile = null;
    var resultUser = null;
    return q.Promise((resolve, reject)=>{

        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            if (response.statusCode !== 200) {
                reject(new AppError("Error with the code "+accessToken.error.message, 401))
            }
            else{
                resolve(accessToken);
            }
        });

    }).then((accessToken)=>{
        return q.Promise((resolve, reject)=>{
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
                if (response.statusCode !== 200) {
                    reject(new AppError("Error with the profile "+profile.error.message, 401))
                }
                else{
                    resolve(profile);
                }

            });
        })
    }).then((resProfile)=>{
        profile = resProfile;
        profile.username = "facebook_"+profile.id;
        return User.findOne({username:profile.username}).lean().populate("community").exec();
    }).then((user)=>{
        if(!user){
            var newUser = new User({
                username:profile.username,
                name:profile.name,
                email:profile.email,
                profileImageURL:profile.picture.data.url,
                isProfileUpdated:false,
                isActive:true,
                authProvider:"facebook"
            })

            return newUser.save().then(()=>{
                return User.findOne({username:profile.username}).lean().populate("community").exec();
            });
        }
        return q.when(user);
    }).then((user)=>{
        resultUser = user;
        return notificationUtil.getNotificationCount(user._id);
    }).then((notifications)=>{
        resultUser.notifications = notifications
        return tokenUtil.generateToken(resultUser._id);
    }).then((token)=>{
        return q.when({
            user:resultUser,
            token:token
        })
    })
}