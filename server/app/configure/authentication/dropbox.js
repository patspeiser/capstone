'use strict';
var passport = require('passport');
var DropboxStrategy = require('passport-dropbox-oauth2').Strategy;
var http = require('http');

module.exports = function (app, db) {

    var User = db.model('user');

    var dropboxConfig = app.getValue('env').DROPBOX;
    var dropboxCreds = {
        clientID: dropboxConfig.clientID,
        clientSecret: dropboxConfig.clientSecret,
        callbackURL: dropboxConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
    	console.log('here?');
    	// app.get('/session', function (req, res, next) {
    	// 	var err;
    	// 	if (req.user) {
    	// 		res.send({ user: req.user.sanitize() });
    	// 	} else {
    	// 		err = new Error('No authenticated user.');
    	// 		err.status = 401;
    	// 		next(err);
    	// 	}
    	// });	
    	done();
    };

    passport.use(new DropboxStrategy(dropboxCreds, verifyCallback));

    app.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));

    app.get('/auth/dropbox/callback',
        passport.authenticate('dropbox-oauth2', {failureRedirect: '/login'}),
        function (req, res) {
        	console.log('here or something');
            res.redirect('/');
        });
};