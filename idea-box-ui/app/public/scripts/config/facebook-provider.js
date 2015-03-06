'use strict';
angular
    .module(_APP_).provider('facebook', function facebookProvider() {
        var appId;
        window.fbAsyncInit = function() {
            console.log('The FB object is ' + FB);
            FB.init({
                'appId': appId,
                'cookie': true, // enable cookies to allow the server to access 
                // the session
                'xfbml': true, // parse social plugins on this page
                'version': 'v2.1' // use version 2.1
            });

        };


        this.setAppId = function(value) {
            appId = value;
        };

        this.$get = ['$q', function facebookFactory($q) {
            return {
                'loginToFacebook': function() {
                    var deferred = $q.defer();
                    FB.login(function(response) {
                        if (response.authResponse) {
                            var accessToken = FB.getAuthResponse().accessToken;
                            console.log('Welcome!  Fetching your information.... ');
                            FB.api('/me', function(response) {
                                response.accessToken = accessToken;
                                console.log('Good to see you, ' + response.name + '.');
                                deferred.resolve(response);
                            });
                        } else {
                            deferred.reject('facebook login failed');
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {
                        scope: 'public_profile,email,user_likes'
                    });
                    return deferred.promise;
                },

                'checkLoginStatus': function() {

                    if (FB !== null && FB.getLoginStatus !== null) {
                        var deferred = $q.defer();
                        console.log('calling FB.getLoginStatus!!!!!!!!!!!!!! FB is ' + FB);
                        FB.getLoginStatus(function(response) {
                            switch (response.status) {
                                case 'connected':
                                    var accessToken = FB.getAuthResponse().accessToken;
                                    FB.api('/me', function(response) {
                                        response.accessToken = accessToken;
                                        console.log('Good to see you, ' + response.name + '.');
                                        deferred.resolve(response);
                                    });
                                    //deferred.resolve(response);
                                    break;
                                case 'not_authorized':
                                    deferred.reject('not authorized');
                                    break;
                                case 'unknown':
                                    deferred.reject('not logged into facebook');
                                    break;
                            }
                        });
                        return deferred.promise;
                    }

                },
                'logOut': function() {
                    var deferred = $q.defer();
                    FB.logout(function(response) {
                        console.log('Facebook user logged out successfully ' + JSON.stringify(response));
                        deferred.resolve('success');
                    });
                    return deferred.promise;
                }
            };
        }];
    });


angular
    .module(_APP_).config(['facebookProvider', function(facebookProvider) {

        //set the appId for your app.
        facebookProvider.setAppId('469067083172965');
        //Loads the facebook sdk
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    }]);
