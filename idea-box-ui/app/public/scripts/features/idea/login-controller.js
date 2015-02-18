'use strict';

angular
    .module(_CONTROLLERS_)
    .controller('LoginController', function($rootScope, $scope, facebook, $state) {

        $scope.test = '123';


        $scope.loginToFacebook = function() {
            var promise = facebook.loginToFacebook();
            promise.then(function(response) {
                console.log('FaceBook Response is ' + JSON.stringify(response));

                $rootScope.userDetails = {};
                $rootScope.userDetails.isLoggedIn = true;
                $rootScope.userDetails.userId = response.id;
                $rootScope.userDetails.accessToken = response.accessToken;
                $rootScope.userDetails.userPic = 'http://graph.facebook.com/' + response.id + '/picture';
                $rootScope.userDetails.displayName = response.name;

                var user = angular.copy($scope.userDetails);
                //$scope.$emit('userLoggedIn', user);
                $state.transitionTo('main');
            }, function(err) {
                console.error('Error is ' + err);
            });
        };

    });
