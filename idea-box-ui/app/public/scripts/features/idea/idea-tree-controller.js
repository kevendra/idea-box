'use strict';

angular
.module(_CONTROLLERS_)
.controller('IdeaTreeController', function ($scope, $state) {

  $scope.reply = function(){
    console.log('here in scope');

    
    $state.go('signin');
  };

});
