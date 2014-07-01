// define module
var registerModule = angular.module('registerModule', ['ui.router', 'ui.bootstrap']);

// config router
registerModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/register/step1");

    $stateProvider.state('register', {
      abstract: true,
      url: "/register",
      templateUrl: "modules/register/templates/register.html"
    }).state('register.mobile', {
      url: "/step1",
      controller: 'mobileController',
      templateUrl: "modules/register/templates/mobile.html"
    }).state('register.captcha', {
      url: "/step2",
      controller: 'captchaController',
      templateUrl: "modules/register/templates/captcha.html"
    }).state('register.success', {
      url: "/success",
      controller: 'successController',
      templateUrl: "modules/register/templates/success.html"
    }).state('register.failure', {
      url: "/failure",
      controller: 'successController',
      templateUrl: "modules/register/templates/failure.html"
    });
  }
]);