var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var BookRequest = require('../models/bookRequest');
var tokenUtil = require('../utilities/tokenUtil');

module.exports.get = function(req){
    var userId = req.params.userId;
    return BookRequest.find({requester:userId}).
        sort({'createdDateTime': 'desc'}).
        populate('requester').
        populate('book').
        populate('owner').exec().then((requests)=>{
        return q.when({
            requests:requests
        })
    })
};