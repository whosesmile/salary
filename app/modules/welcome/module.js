// define module
var welcomeModule = angular.module('welcomeModule', ['ui.router', 'ui.bootstrap']);

// config router
registerModule.config(['$stateProvider',
  function ($stateProvider) {

    $stateProvider.state('welcome', {
      url: "/welcome",
      template: "<h3>Welcome~~~</h3>"
    });
  }
]);