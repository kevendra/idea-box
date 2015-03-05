var passport = require('passport');

var securityChain = {
    'initialize': function(app) {
        //app.all('*', this.applySecurityChain);

        app.post('/api/idea/add-update-idea.json', this.applySecurityChain);
        app.post('/api/user/add-update-user.json', this.applySecurityChain);
        //app.get('/api/idea/idea-list.json', this.applySecurityChain);

    },

    'applySecurityChain': function(req, res, next) {

        console.log('calling applySecurityChain');
        if (req.isAuthenticated()) {
            console.log('User is authenticated......');
            return next();
        } else {
            console.log('calling passport');
            passport.authenticate('github', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json(200, 'User Not Present');
                }
                req.logIn(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/users/' + user.username);
                });
            })(req, res, next);
        }

    }

};





module.exports = securityChain;
