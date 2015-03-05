var buildUserObjectAfterOauthAuthentication = function(authenticatedBy, response) {
    var user = {};
    switch (authenticatedBy) {
        case 'GITHUB':
            user.thirdPartyOauthUserId = response.id;
            user.email = response.emails[0];
            user.displayName = response.displayName;
            user.loginType = 'github';
            user.accessToken = '';
            /* jshint ignore:start */
            user.firstName = response.displayName;
            user.lastname = '';
            /* jshint ignore:end */
            user.phone = '';
            user.thumbnail = response._json.avatar_url;
            break;
    }
    return user;
}


module.exports = buildUserObjectAfterOauthAuthentication;
