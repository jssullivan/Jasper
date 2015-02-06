var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var passportUser = require('./models/passportUser');
var session = require('express-session');
var bcrypt = require('bcrypt');

var app = express();
mongoose.connect('mongodb://localhost/Jasper');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session({ 
	secret: 'testsecret', 
	saveUninitialized: true, 
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require('./passport')(passport, localStrategy, passportUser);
require('./routes')(app);

app.listen(3000);                     
exports = module.exports = app;