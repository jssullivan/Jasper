var mongoose = require('mongoose');

module.exports = mongoose.model('BuildRevision', {
    imageId : {type : String, default: ''},
    revision : {type : String, default: ''},
    changes: {type : String, default: ''}
});