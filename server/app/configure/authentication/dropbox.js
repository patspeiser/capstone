var passport = require('passport');
var DropboxStrategy = require('passport-dropbox-oauth2').Strategy;

passport.use(new DropboxOAuth2Strategy({
    apiVersion: '2',
    clientID: DROPBOX_CLIENT_ID,
    clientSecret: DROPBOX_CLIENT_SECRET,
    callbackURL: "https://www.example.net/auth/dropbox-oauth2/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ providerId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/auth/dropbox',
  passport.authenticate('dropbox-oauth2'));

app.get('/auth/dropbox/callback', 
  passport.authenticate('dropbox-oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });