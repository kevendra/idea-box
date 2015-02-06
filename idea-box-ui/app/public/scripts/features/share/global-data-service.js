'use strict';

angular.module(_APP_).factory('GlobalDataService', function($rootScope, $timeout) {

  return {
    working : function() {
      $rootScope.rootUi.working = true;
      $timeout(
        function () {
          $rootScope.rootUi.working = false;
        }, 5000 //max 5 sec. show working
      );
    },
    isWorking : function() {
      return $rootScope.rootUi.working; //return $rootScope.rootUi.working not working holding old state //TODO verify one more time
    },
    resetWorking : function() {
      $rootScope.rootUi.working = false;
    },
    addMsg : function(msg){
      $rootScope.rootUi.msg = msg;
      $timeout(
        function () {
          $rootScope.rootUi.msg = null;
        }, 8000 //max 8 sec. show working
      );
    }    
  };//end return
});//end DataService