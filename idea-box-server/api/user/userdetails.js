var dependency = require('../dependency');

var getLoggedInUser = function(req, res) {

    if(!req.isAuthenticated()) {
        res.status(401).json('User not logged in');
        return;
    }else {
        res.status(200).json(req.user);
        return;
    }
    // var user = userObject;
    // var deferred = dependency.getQ().defer();

    // promise.then(function(doc) {
    //         dependency.getUserModel().findOne({
    //             'thirdPartyOauthUserId': user.thirdPartyOauthUserId
    //         }, function(err, doc) {
    //             if (err) {
    //                 deferred.reject(err);
    //             } else {
    //                 // console.log(JSON.stringify(doc));
    //                 // res.status(200).json(doc);
    //                 deferred.resolve(doc);
    //             }
    //         });

    //     })
    //     .fail(function(reason) {
    //         deferred.reject(reason);
    //     });

    // return deferred.promise;
}


module.exports = {
    getLoggedInUser: getLoggedInUser
}
