'use strict';
/*
 Usage:
 watch on editProfile
 <div data-cdk-header ></div>
 */
angular.module(_DIRECTIVES_)
.directive('cdkHeader', function () {
  return {
    restrict:'EA', //A = Attribute, C = Class Name, E = Element, M = HTML Comments
    templateUrl:'public/views/common/cdk-header.html'
  };
});