var demoModule = angular.module('demoModule', ['ui.router']);

demoModule.config(function ($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "components/demo/state1.partials.html"
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "components/demo/state2.partials.html"
    });
});