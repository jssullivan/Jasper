var mongoose = require('mongoose');

module.exports = mongoose.model('IssueReport', {
    title : {type : String, default: '', required: true, unique: true },
    description : {type : String, default: ''},
    priority : {type : String, default: "", required: true },
    assignTo : {type : String, default: "", required: true },
    status : {type : String, default: "", required: true }
});