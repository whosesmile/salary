// define module
var welcomeModule = angular.module('welcomeModule', ['ui.router', 'ui.bootstrap']);

// config router
welcomeModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        controller: 'homeController',
        templateUrl: "modules/welcome/templates/home.html"
      });
  }
]);