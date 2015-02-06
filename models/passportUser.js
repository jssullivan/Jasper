var mongoose = require('mongoose');

module.exports = mongoose.model('PassportUser', {
    username : {type : String, default: '', required: true, unique: true },
    password : {type : String, default: '', required: true }
});