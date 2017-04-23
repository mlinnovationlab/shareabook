var mongoose = require('mongoose');

var group = function () {

    var group = mongoose.Schema({
        name: { type: String, unique:true, required: true },
        type: { type: String}
    });

    return mongoose.model('Group', group);
}

module.exports = new group();