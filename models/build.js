var mongoose = require('mongoose');

module.exports = mongoose.model('Build', {
    imageName : {type : String, default: ''},
    imageOSVersion : {type : String, default: ''},
    imageType : {type : String, default: ''},
    lastCaptured : {type : String, default: ''},
    imageStatus : {type : String, default: ''},
    imageDescription : {type : String, default: ''},
    imageLicense : {type : String, default: ''}
});