var mongoose = require('mongoose');

var image = function () {

    var image = mongoose.Schema({
        type: { type: String, required: true },
        ext: { type: String, required: true },
        data: { type: Buffer, required: true }
    });

    return mongoose.model('Image', image);
}

module.exports = new image();