'use strict';

angular
.module(_DIRECTIVES_)
.directive('alertMessage', function () {
  return {
    restrict:'AE', //A = Attribute, C = Class Name, E = Element, M = HTML Comments
    templateUrl:'public/views/directive/alert-message.html',
    replace:true,
    scope: {
      messages: '='
    },
    link: function(scope, iElement, iAttrs) {
      scope.closeable = 'close' in iAttrs;
    }
  };
});