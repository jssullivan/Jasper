var passport = require('passport');

module.exports = function(app) {
	function isAuthed(req, res, next) {
		if (req.isAuthenticated()) {
	    	return next();
		}

	  	res.redirect('/');
	}

	//Login
	app.post('/login', passport.authenticate('local', { successRedirect: '/login/success', failureRedirect: '/login/failure', failureFlash: false }));

	//Login responces
	app.get('/login/success', function(req, res){res.send({ loginStatus: 'success' });});
	app.get('/login/failure', function(req, res){res.send({ loginStatus: 'failure' });});

	//Logout
	app.get('/logout', function(req, res){
      req.logout();
      res.redirect("/");
   });

	//Authentication status (So Angular knows)
	app.get('/authStatus', function(req, res){
		if (req.isAuthenticated()) {
    	   res.send({ authStatus: 'valid' });
		} else {
			res.send({ authStatus: 'invalid' });
		}
	});

	//User information
	app.get('/userInfo', isAuthed, function(req, res){
		res.send({ name: req.user.name });
   	});

	//Catch all 404's
	app.get('*', function(req, res){
		res.redirect('/');
	});
};