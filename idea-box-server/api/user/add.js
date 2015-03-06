var dependency = require('../dependency');



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
    saveOrUpdateThirdPartyUser: updateThirdPartyUser
}
