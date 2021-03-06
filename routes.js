var passport = require('passport');
var Build = require('./models/build');
var IssueReport = require('./models/issue.js');
var PassportUser = require('./models/passportUser');
var BuildRevision = require('./models/buildRevision');

module.exports = function(app) {
	function requireAuth(req, res, next) {
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
	app.get('/authStatus', function(req, res) {
		if (req.isAuthenticated()) {
    		res.send({ authStatus: 'valid' });
		} else {
			res.send({ authStatus: 'invalid' });
		}
	});

	//User information
	app.get('/userInfo', requireAuth, function(req, res){
		res.send({ name: req.user.name });
   	});

   	//Add a new or update an existing build
   	app.post('/builds/save', requireAuth, function(req, res) {
   		Build.findOne({_id : req.body.id}, function(err, build) {
   			var saveBuild;

   			if (build == null) {
   				saveBuild = new Build({
		   			imageName: req.body.name,
		   			imageOSVersion: req.body.os,
		   			imageType: req.body.type,
		   			lastCaptured: req.body.date,
		   			imageStatus: "New",
		   			imageDescription: "",
		   			imageLicense: req.body.license,
		   		});

		   		var revision = new BuildRevision({
   					imageId: saveBuild._id,
   					revision: "r1",
   					changes: "Initial Revision"
   				});

   				revision.save();
   			} else {
   				saveBuild = new Build({
		   			_id: req.body.id,
		   			imageName: req.body.name,
		   			imageOSVersion: req.body.os,
		   			imageType: req.body.type,
		   			lastCaptured: req.body.date,
		   			imageStatus: req.body.status,
		   			imageDescription: "",
		   			imageLicense: req.body.license,
		   		});
   			}

   			var objBuild = saveBuild.toObject();
   			delete objBuild._id;

   			Build.update({_id: saveBuild.id}, objBuild, {upsert: true}, function(err){return err});

   			res.send({ status: 'success'});
   		});
   	});

   	//Delete a build
   	app.post('/builds/delete', requireAuth, function(req, res) {
   		Build.find({_id : req.body.id}, function(err, builds) {
   			builds.forEach(function(build) {
   				build.remove();
   			});
   		});

   		BuildRevision.find({buildId : req.body.id}, function(err, revisions) {
   			revisions.forEach(function(revision) {
   				revision.remove();
   			});
   		});

   		res.send({ status: 'success'});
   	});

   	//Send the revisions of a build
   	app.get('/builds/revisions', requireAuth, function(req, res) {
   		BuildRevision.find({'imageId' : req.query.buildId}, function(err, queryRevisions) {
   			var revisions = [];
   			queryRevisions.forEach(function(revision) {
   				revisions.push(revision);
   			});

   			res.send(revisions);
   		});
   	});

   	//Add a new revision
   	app.post('/builds/addRevision', requireAuth, function(req, res) {
   		var revision = new BuildRevision({
			imageId: req.body.id,
			revision: req.body.revision,
			changes: req.body.changes
		});

   				revision.save();
   		res.send({ status: 'success'});
   	});

   	//Send the builds
   	app.get('/builds/list', requireAuth, function(req, res) {
   		Build.find({}, function(err, builds) {
   			var buildsList = {};

   			builds.forEach(function(build) {
   				var key = build.imageOSVersion;

   				if (key.indexOf("Windows") != -1) {
   					key = "Windows " + key.split(' ')[1];
   				}

   				if (buildsList[key] === undefined) {
   					buildsList[key] = [];
   				}

   				buildsList[key].push(build.toObject());
   			});

   			res.send(buildsList);
   		});
   	});

   	//Get users to assign issues to
   	app.get('/issues/assignees', requireAuth, function(req, res) {
   		PassportUser.find({}, function(err, users) {
   			var assignees = [];

   			users.forEach(function(user) {
   				assignees.push(user.name);
   			});

   			res.send(assignees);
   		});
   	});
   	
   	//Add or update an issue
   	app.post('/issues/save', requireAuth, function(req, res) {
   		IssueReport.findOne({_id : req.body.id}, function(err, issue) {
   			var saveIssue;

   			if (issue == null) {
   				saveIssue = new IssueReport({
		   			title: req.body.title,
		   			description: req.body.description,
		   			priority: req.body.priority,
		   			assignTo: req.body.assignTo,
		   			status: req.body.status
		   		});
   			} else {
		   		saveIssue = new IssueReport({
		   			_id: req.body.id,
		   			title: req.body.title,
		   			description: req.body.description,
		   			priority: req.body.priority,
		   			assignTo: req.body.assignTo,
		   			status: req.body.status
		   		});
   			}

   			var objIssue = saveIssue.toObject();
   			delete objIssue._id;

   			IssueReport.update({_id: saveIssue.id}, objIssue, {upsert: true}, function(err){return err});

   			res.send({ status: 'success'});
   		});
   	});

   	//Send the issues
   	app.get('/issues/list', requireAuth, function(req, res) {
   		IssueReport.find({}, function(err, issues) {
   			var issuesList = [];

   			issues.forEach(function(issue) {
   				issuesList.push(issue.toObject());
   			});

   			res.send(issuesList);
   		});
   	});

   	//Delete an issue
   	app.post('/issues/delete', requireAuth, function(req, res) {
   		IssueReport.find({_id : req.body.id}, function(err, issues) {
   			issues.forEach(function(issue) {
   				issue.remove();
   			});
   		});

   		res.send({ status: 'success'});
   	});

	//Catch all 404's
	app.get('*', function(req, res){
		res.redirect('/');
	});
};