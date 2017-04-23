var q = require('q');
var appConfig = require('../config/appConfig');
var AppError = require('../models/error');
var BookRequest = require('../models/bookRequest');
var fs = require('fs');
var path = require('path');
var vash = require('vash');
var transporter = require('nodemailer').createTransport(appConfig.notifications.email.transportConfig);


module.exports.sendNewRequestEmail = function(requestId){

    var mailOptions = appConfig.notifications.email.defaultOptions;
    return BookRequest.findById(requestId).lean()
        .populate('owner')
        .populate('requester')
        .populate('book').exec().then((request)=>{
            var model = {
                bookName:request.book.title,
                authorName:request.book.author,
                requesterName:request.requester.name,
                requesterEmail:request.requester.email
            }
            var htmlEmail = parseTemplate(model);
            mailOptions.to = request.owner.email;
            mailOptions.html = htmlEmail;
            var sendMailFn = q.nbind(transporter.sendMail, transporter);
            sendMailFn(mailOptions);
        }).catch((err)=>{
            console.log(err);
        })

}


function parseTemplate(model){
    var contents = fs.readFileSync(path.resolve(__dirname, '..','templates','email','NewBookRequest.html')).toString();
    var template = vash.compile(contents);
    return template(model);
}