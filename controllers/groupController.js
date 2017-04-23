var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var Group = require('../models/group');

module.exports.get = function(req){
    return Group.find().exec();
}

module.exports.post = function(req){
    var name = req.body.name;
    var type = req.body.type;
    var group = new Group({
        name:name,
        type:type
    });

    return group.save().then(()=>{
        return q.when();
    })
}