var passport = require('passport');

module.exports = function(app) {
	function isAuthed(req, res, next) {
		if (req.isAuthenticated()) {
	    	return next();
		}

	  	res.redirect('/');
	}

	//Login POST route
   	app.post('/login', passport.authenticate('local', { successRedirect: '/login/success', failureRedirect: '/login/failure', failureFlash: false }));

   	//Login GET responce routes
   	app.get('/login/success', function(req, res){res.send({ loginStatus: 'success' });});
   	app.get('/login/failure', function(req, res){res.send({ loginStatus: 'failure' });});

   	//Auth status route
   	app.get('/authStatus', function(req, res){
   		if (req.isAuthenticated()) {
	    	res.send({ authStatus: 'valid' });
		} else {
			res.send({ authStatus: 'invalid' });
		}
   	});
};