var mongoose = require('mongoose');

var userModel = function () {

    var userSchema = mongoose.Schema({
        username: { type: String, unique: true,required: true },
        community: {type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
        name: String,
        email: String,
        contactNumber: String,
        apartmentNumber: String,
        profileImageURL:String,
        authProvider:String,
        isProfileUpdated:{type:Boolean, required: true},
        availability:{
            day:String,
            from:String,
            to:String
        },
        children:[{
            age:String,
            preferredBookCategories:[String]
        }],
        isActive:Boolean
    });

    return mongoose.model('User', userSchema);
}

module.exports = new userModel();