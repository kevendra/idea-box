
var dependency = require('../dependency');

var saveOrUpdateThirdPartyUser = function(req, res) {
    var user = req.body.user;
    var promise = updateThirdPartyUser(user);
    promise.then(function(doc) {
            dependency.getUserModel().findOne({
                'thirdPartyOauthUserId': user.thirdPartyOauthUserId
            }, function(err, doc) {
                console.log(JSON.stringify(doc));
                res.status(200).json(doc);
            });

        })
        .fail(function(reason) {
            res.status(200).json(reason);
        });
}


function updateThirdPartyUser(user) {
    var UserModel = dependency.getUserModel();
    var deferred = dependency.getQ().defer();
    console.log('Created deferred');
    UserModel.update({
            'thirdPartyOauthUserId': user.thirdPartyOauthUserId
        },
        user, {
            upsert: true
        },
        function(err, doc) {
            console.log('In  update callback');
            if (!err) {
                console.log('In  update resolve');
                deferred.resolve(doc);
            } else {
                console.log('In  update reject');
                deferred.reject({
                    message: 'Could not create user.Error: ' + err
                });
            }
        });

    return deferred.promise;
}


module.exports = {
	saveOrUpdateThirdPartyUser: saveOrUpdateThirdPartyUser 
}
