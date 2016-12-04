'use strict';
var passport = require('passport');
var DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy;
var http = require('http');

module.exports = function (app, db) {

    var User = db.model('user');

    var dropboxConfig = app.getValue('env').DROPBOX;
    var dropboxCreds = {
        clientID: dropboxConfig.clientID,
        clientSecret: dropboxConfig.clientSecret,
        callbackURL: dropboxConfig.callbackURL,
        passReqToCallback: true
    };

    var verifyCallback = function (req, accessToken, refreshToken, profile, done) {
    	console.log('verify', req.protocol, req.user.id, accessToken);
    	User.findById(req.user.id)
    		.then(function(user){
    			user.dropbox_id = accessToken;
    			user.save();
    			return user;
    		})
    		.then(function(userToLogin){
    			done(null, userToLogin);
    		})
    		.catch(function(err){
    			return err;
    		});

    };
    passport.use(new DropboxOAuth2Strategy(dropboxCreds, verifyCallback));

    app.get('/auth/dropbox', passport.authenticate('dropbox-oauth2'));

    app.get('/auth/dropbox/callback',
        passport.authenticate('dropbox-oauth2', {successRedirect: '/user', failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });
};