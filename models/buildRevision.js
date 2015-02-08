var mongoose = require('mongoose');

module.exports = mongoose.model('BuildRevision', {
    imageName : {type : String, default: ''},
    imageVersion : {type : String, default: ''},
    imageChanges: {type : String, default: ''}
});