var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var db = require('./config/db'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportUser = require('./models/passportUser');
var session = require('express-session');

var app = express();
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session({ secret: 'testsecret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require('./passport')(passport, LocalStrategy, passportUser);
require('./routes')(app);

app.listen(3000);                     
exports = module.exports = app;