'use strict';

angular.module(_APP_).factory('UserService', function($http, API) {

  return {
    
    addUpdateUser: function(model, callback) {
      //var config = {params: healthModel};
      return $http.post(API.ADD_UPDATE_USER, model)
    }// end addUpdateIdea
  };
});