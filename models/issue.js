var mongoose = require('mongoose');

module.exports = mongoose.model('IssueReport', {
    title : {type : String, default: '', required: true, unique: true },
    description : {type : String, default: ''},
    status : {type : Number, default: 0, required: true },
    reportDetails : {type : Array, default: null }
});