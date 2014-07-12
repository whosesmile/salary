// define module
var testModule = angular.module('testModule', ['ui.router', 'ui.bootstrap']);

// config router
testModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('test', {
        url: "/test",
        templateUrl: "modules/test/templates/test.html"
      });
  }
]);