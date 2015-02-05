'use strict';

/*
 authData userData
 sessionStorage key : authData
 */
angular.module(_APP_).factory('SessionService', function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  };
});//end SessionService

angular.module(_APP_).factory('LocalService', function() {
  return {
    get: function(key) {
      return localStorage.getItem(key);
    },
    set: function(key, val) {
      return localStorage.setItem(key, val);
    },
    unset: function(key) {
      return localStorage.removeItem(key);
    }
  };
});//end LocalService