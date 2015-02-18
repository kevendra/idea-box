'use strict';

angular.module(_APP_)
.config(function ($locationProvider, $stateProvider, $urlRouterProvider, ENV) {

  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise('/');
  $stateProvider
    // .state('root', {url: '/', templateUrl: 'public/views/home.html'})

    .state('main', {url: '/', templateUrl: 'public/views/common/main.html'})

    .state('idea', {url: '/idea', templateUrl: ENV.template})
    .state('idea.add', {url: '/add', templateUrl: 'public/views/idea/add.html', controller: 'IdeaController'})
    .state('idea.list', {url: '/list', templateUrl: 'public/views/idea/list.html', controller: 'IdeaController'})
    .state('idea.login', {url: '/login', templateUrl: 'public/views/idea/login.html'});

});
