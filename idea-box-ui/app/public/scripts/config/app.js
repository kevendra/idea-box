'use strict';

// global variable

/* see jshint error http://jslinterrors.com/redefinition-of-a/ */
/*jshint -W079 */
var _APP_ = 'com.cdk.internal.ideaApp',
    _CONTROLLERS_ = _APP_ + '.controllers',
    _DIRECTIVES_ = _APP_ + '.directives',
    _FILTERS_ = _APP_ + '.filters',
    _MODULES_ = _APP_ + '.modules',
    _SERVICES_ = _APP_ + '.services';

// Declare app level module which depends on filters, services, etc
// top-level module
var app = angular.module(_APP_, [
    // Your application's namespaced modules, so they won't conflict with other modules. 
    // You shouldn't have to touch these unless you want to.             
    _CONTROLLERS_,
    _DIRECTIVES_,
    _FILTERS_,
    _MODULES_,
    _SERVICES_,

    'ui.router', // 'ngRoute'
    'ui.bootstrap', //  'ui.bootstrap.tpls',
    'textAngular'
]);

// Create global modules. You shouldn't have to touch these.
angular.module(_CONTROLLERS_, []);
angular.module(_DIRECTIVES_, []);
angular.module(_FILTERS_, []);
angular.module(_MODULES_, []);
angular.module(_SERVICES_, []);

var authenticate = function($rootScope , $state, LocalService, UserService) {
    var checkIfUserIsAlreadyLoggeIn = function() {
        //var promise = facebook.checkLoginStatus();
        var promise = UserService.checkIfUserIsLoggedIn();
        promise.then(function(response) {

            // $rootScope.userDetails = {};
            // $rootScope.userDetails.isLoggedIn = true;
            // $rootScope.userDetails.userId = response.id;
            // $rootScope.userDetails.accessToken = response.accessToken;
            // $rootScope.userDetails.userPic = 'http://graph.facebook.com/' + response.id + '/picture';
            // $rootScope.userDetails.displayName = response.name;

            $rootScope.userDetails = {};
            $rootScope.userDetails.isLoggedIn = true;
            $rootScope.userDetails.userId = response.data.thirdPartyOauthUserId;
            $rootScope.userDetails.accessToken = response.data.accessToken;
            $rootScope.userDetails.userPic = response.data.thumbnail;
            $rootScope.userDetails.displayName = response.data.displayName;
            //window.alert(JSON.stringify($rootScope.userDetails.displayName));

            //var user = OauthUserBuilderFactory.buildUserObjectAfterOauthAuthentication('FACEBOOK', response);
            //LocalService.set('user', angular.toJson(user));
            LocalService.set('user', angular.toJson($rootScope.userDetails));

            

            // UserService.addUpdateUser({
            //     'user': user
            // }).then(function() {
            //     //$state.transitionTo('main');
            // });

            //$scope.$apply();
        }, function(err) {
            if (err === 'unknown') {
                //$scope.loginToFacebook();
            }
            $state.transitionTo('main');
        });
    };

    setTimeout(function() {
        checkIfUserIsAlreadyLoggeIn();
    }, 1000);
};


/*
  browser refresh call
*/
angular.module(_APP_).run(function($rootScope, ENV , IdeaService, $state, LocalService, UserService) {
    console.log('angular.module app run ' + app);

    //var emptyRootModel = {user};
    $rootScope.rootUi = angular.copy(ENV.emptyRootUi);
    $rootScope.rootModel = angular.copy(ENV.emptyRootModel);
    $rootScope.rootModel.calDateFormat = ENV.dateFormat;

    //  AuthenticationService.authCheck();
    authenticate($rootScope, $state, LocalService, UserService);

    // $rootScope.signOut = function() {
    //     var promise = facebook.logOut();
    //     promise.then(function() {
    //         $rootScope.userDetails = {};
    //         $rootScope.userDetails.isLoggedIn = false;
    //         LocalService.unset('user');
    //         $state.transitionTo('main');
    //     });
    // };

    $rootScope.signOut = function() {
        LocalService.unset('user');
        window.location.href = 'http://localhost:3000/logout';
    };

});


