var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var ids = require('./oauthSpecifications');
var githubSpecs = ids.github;
var oauthFactory = require('./OauthFactory');
var addUser = require('../user/add');


var githubStratergy = {
    'initialize': function(app) {
        passport.use(new GitHubStrategy({
                clientID: githubSpecs.GITHUB_CLIENT_ID,
                clientSecret: githubSpecs.GITHUB_CLIENT_SECRET,
                callbackURL: githubSpecs.callbackURL
            },
            function(accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function() {
                    console.log('User is ' + JSON.stringify(profile))
                    var user = oauthFactory('GITHUB', profile);
                    addUser.saveOrUpdateThirdPartyUser(user);
                    return done(null, user);
                });
            }
        ));



        app.get('/auth/github', passport.authenticate('github'));

        app.get('/auth/github/callback',
            passport.authenticate('github', {
                successRedirect: '/',
                failureRedirect: '/users'
            }));


        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });


    }
};



module.exports = githubStratergy;
