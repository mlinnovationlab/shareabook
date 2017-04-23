var mongoose = require('mongoose');

var bookRequest = function () {

    var bookRequest = mongoose.Schema({
        owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requester: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        status: {type: String},
        createdDateTime :{type : Date, default: Date.now}
    });

    return mongoose.model('BookRequest', bookRequest);
}

module.exports = new bookRequest();