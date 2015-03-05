var passport = require('passport');


var OAuth = {
    'initialize': function(app) {

        

        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function(user, done) {
            console.log('Serializing user ' + JSON.stringify(user));
            return done(null, user);
        });

        passport.deserializeUser(function(obj, done) {
            console.log('Desiarilsing user ' + JSON.stringify(obj));
            return done(null, obj);
        });
    }
};


module.exports = OAuth;
