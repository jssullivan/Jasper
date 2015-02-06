var bcrypt = require('bcrypt');

module.exports = function(passport, strategy, model) {
	passport.use('local', new strategy( function(username, password, done) {
		model.findOne({ username: username }, function(err, user) {

			if (err) { 
				return done(err); 
			}

			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			bcrypt.compare(password, user.password, function(err, res) {
			    if (res) {
			    	return done(null, user);
			    } else {
			    	return done(null, false, { message: 'Incorrect password.' });
			    }
			});	
	    });
	  }
	));

	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
	  model.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
};