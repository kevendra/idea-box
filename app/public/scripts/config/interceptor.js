'use strict';

angular
  .module(_APP_)
  .config(function($httpProvider, $provide) {


//  Global http error handling
//    var alertMessageInterceptor = ['$q', 'GlobalDataService', function($q, GlobalDataService) {
//    $provide.factory('alertMessageInterceptor', function($q, GlobalDataService) {
    $provide.factory('alertMessageInterceptor', ['$q', 'GlobalDataService', function($q, GlobalDataService) {
      return {
        response: function(response) {
          //do something on success
          //only receive responses that fall below status code 300, there is no use for it when we want to catch 401.
          //Will only be called for HTTP up to 300
          if(!String.prototype.startsWith){
            String.prototype.startsWith = function (str) {
              return !this.indexOf(str);
            };
          }
          if((response.config.url).startsWith('api/')){//examine JSON response
            //DataService.addMsg(response.data.msg);
//            if(! $rootScope.rootUi){
//              console.log('$rootScope.rootUi '+ $rootScope.rootUi);
//              $rootScope.rootUi = {working: false, msg: null};
//            }
            GlobalDataService.addMsg(response.data.msg);
          }
          //Global http error handling
          return response || $q.when(response); //has to return a response object or a promise.
        }

      };//end return

    }]);

  $httpProvider.interceptors.push('alertMessageInterceptor');
//    $httpProvider.interceptors.push(alertMessageInterceptor);

});
