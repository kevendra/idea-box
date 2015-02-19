'use strict';



angular.module(_APP_).factory('OauthUserBuilderFactory',
    function() {
        return {
            'buildUserObjectAfterOauthAuthentication': function(authenticatedBy, response) {
                var user = {};
                switch (authenticatedBy) {
                    case 'FACEBOOK':
                        user.thirdPartyOauthUserId = response.id;
                        user.email = response.email;
                        user.gender = response.gender;
                        user.displayName = response.name;
                        user.loginType = 'Facebook';
                        user.accessToken = response.accessToken;
                        /* jshint ignore:start */
                        user.firstName = response.first_name;
                        user.lastname = response.last_name;
                        /* jshint ignore:end */
                        user.phone = response.phone;
                        user.thumbnail = 'http://graph.facebook.com/' + response.id + '/picture';
                        break;
                }
                return user;
            }
        };
    });
