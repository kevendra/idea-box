'use strict';

angular
.module(_CONTROLLERS_)
.controller('ModalController', function ($scope, $modalInstance, model) {
  $scope.model = model;
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
