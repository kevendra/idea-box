'use strict';

angular.module(_APP_).factory('IdeaService', function($http, API) {

  return {
    getIdeaList : function(category) {
      if(! category || category ==='all'){
        return $http.get(API.IDEA_LIST);
      }
      var config = {
        params : {
          'category' : category
        }
      };
      return $http.get(API.IDEA_LIST, config);
    },// end getIdeaList
    deleteIdea : function(id) {
      var config = {
        params : {
          'id' : id
        }
      };
      return $http.delete(API.IDEA_DELETE, config);
    },// end
    addUpdateIdea: function(model, callback) {
      //var config = {params: healthModel};
      return $http.post(API.ADD_UPDATE_IDEA, model)
    }// end addUpdateIdea
  };
});