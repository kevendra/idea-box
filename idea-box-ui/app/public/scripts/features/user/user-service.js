'use strict';

angular.module(_APP_).factory('UserService', function($http, API) {

  return {

  	checkIfUserIsLoggedIn: function() {
  		return $http.get(API.IS_USER_LOGGEDIN);
  	},
    
    addUpdateUser: function(model, callback) {
      //var config = {params: healthModel};
      return $http.post(API.ADD_UPDATE_USER, model)
    }// end addUpdateIdea
  };
});