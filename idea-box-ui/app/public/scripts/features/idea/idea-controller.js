'use strict';

angular
.module(_CONTROLLERS_)
.controller('IdeaController', function ($rootScope, $scope, $modal, $state, ENV, IdeaService, facebook, LocalService) {

  /* ************************************ Private object ************************************ */
  var emptyUi = {categoryItems: null, ideaList: null, selectedCategory: null, parentIdea: null};
  var emptyModel = {_id:null, title: null, description: null, category: null, parentId:null};
  $scope.test = '123';

  var reset = function(){
    $scope.ui = angular.copy(emptyUi);
    $scope.ui.categoryItems = angular.copy(ENV.categoryItems);
    

    $scope.ui.categoryItemsWithAll = angular.copy(ENV.categoryItems);
    $scope.ui.categoryItemsWithAll.push({key:'all',value:'All'});
    $scope.ui.selectedCategory = 'all';

    $scope.model = angular.copy(emptyModel);
    //$scope.model.category = 'technology';
  };
  var openModelDialogDelete = function () {
    var modalInstance = $modal.open({
      templateUrl: 'public/views/idea/dialog-delete-idea.html',
      controller: 'ModalController',
      resolve: {
        model: function () {//pass to UserModalController
          return $scope.model;
        }
      }
    });
    modalInstance.result.then(function () {//ok called
      deleteIdea();
    });
  };
  var deleteIdea = function(){
    IdeaService.deleteIdea($scope.model._id).then(function(response) {
      $scope.initList();
    });
  };
  var getIdeaList = function(){
    IdeaService.getIdeaList($scope.ui.selectedCategory).then(function(response) {
      $scope.ui.ideaList = response.data.data.ideaList;
    });
  };
  /* ************************************ Public Function ************************************ */

  $scope.init = function(){
      reset();  
  };
  $scope.cancel = function(){
    reset();
  };
  $scope.initList = function(){
    reset();
    getIdeaList();
  };
  $scope.addUpdateIdea = function(){
    //$scope.model._id = new Date().getTime();//mogo will generate
    var user = LocalService.get('user');
    var userDetailsObj = angular.fromJson(user)
    $scope.model.userId = userDetailsObj.userId;
    $scope.model.userName = userDetailsObj.displayName;
    IdeaService.addUpdateIdea($scope.model).then(function(response) {
      reset();
    });
  };//end addUpdateIdea

  $scope.reply = function(parentIdea){   
    if(!$rootScope.userDetails || !$rootScope.userDetails.isLoggedIn) {
      alert('Please Login to Reply!!!!!!!');
      return;
    }
    reset();
    $rootScope.$broadcast('REPLY-EVENT', parentIdea);

    //$scope.ui.parentIdea = angular.copy(parentIdea);
    //$scope.parentIdeaXX = angular.copy(parentIdea);
    //console.log('$scope.ui.parentIdea' +JSON.stringify($scope.ui.parentIdea));
    //$scope.model.parentId = parentIdea.id;
    //$scope.model.title = parentIdea.title;
    //$state.go('idea.add');
  };
  
  $scope.edit = function(model){
    reset();
    $rootScope.$broadcast('EDIT-EVENT', model);
  };//end deleteIdea  
  $scope.delete = function(model){
    $scope.model = model;
    openModelDialogDelete();
  };//end deleteIdea
  $scope.categoryChange = function(){
    getIdeaList();
  }

  $scope.$on("REPLY-EVENT",function () {
    var parentIdea = arguments[1]
    if(parentIdea){
      console.log('REPLY-EVENT REPLY-EVENT');
      reset();
      //console.log('REPLY-EVENT '+ JSON.stringify(arguments[1]));
      parentIdea.ideaList = null;
      $scope.ui.parentIdea = angular.copy(parentIdea);
      $scope.model.parentId = parentIdea._id;
      $scope.model.category = parentIdea.category;
    }
  });
  $scope.$on("EDIT-EVENT",function () {
    var model = arguments[1]
    if(model){
      console.log('EDIT-EVENT EDIT-EVENT');
      reset();
      //console.log('REPLY-EVENT '+ JSON.stringify(arguments[1]));
      model.ideaList = null;
      $scope.ui.parentIdea = angular.copy(model);
      $scope.model = angular.copy(model);
    }
  });


  
  
});