var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var request = require('request');
var User = require('../models/user');
var tokenUtil = require('../utilities/tokenUtil');
var notificationUtil = require('../utilities/notificationUtil');

module.exports.post = function(req){
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: appConfig.auth.google.client_secret,
        redirect_uri: req.body.redirectUri,
        grant_type: appConfig.auth.google.grant_type
    };

    var profile = null;
    var resultUser = null;
    return q.Promise((resolve, reject)=>{

        request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
            var accessToken = token.access_token;
            var headers = { Authorization: 'Bearer ' + accessToken };
                resolve(headers);
        });

    }).then((headers)=>{
        return q.Promise((resolve, reject)=>{
            request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
                if (profile.error) {
                    reject(new AppError("Error with the profile "+profile.error.message, 401))
                }
                else{
                    resolve(profile);
                }
            });
        })
    }).then((resProfile)=>{
        profile = resProfile;
        profile.username = "google_"+profile.email;
        return User.findOne({username:profile.username}).lean().populate("community").exec();
    }).then((user)=>{
        if(!user){
            var newUser = new User({
                username:profile.username,
                name:profile.name,
                email:profile.email,
                profileImageURL:profile.picture,
                isProfileUpdated:false,
                isActive:true,
                authProvider:"google"
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