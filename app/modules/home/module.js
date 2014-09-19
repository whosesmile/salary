// define module
var homeModule = angular.module('homeModule', ['ui.router']);

// config router
homeModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "modules/home/templates/home.html"
      })
      .state('skill', {
        url: "/skill",
        templateUrl: "modules/home/templates/skill.html",
        controller: 'skillController'
      })
      .state('examine', {
        url: "/examine/:skill",
        templateUrl: "modules/home/templates/examine.html",
        controller: 'examineController'
      })
      .state('salary', {
        url: "/salary/:salary",
        templateUrl: "modules/home/templates/salary.html",
        controller: 'salaryController'
      });
  }
]);