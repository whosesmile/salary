// define module
var decorateModule = angular.module('decorateModule', ['ui.router', 'ui.bootstrap']);

// config router
decorateModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/decorate', '/decorate/houses');

    $stateProvider
      .state('decorate', {
        abstract: true,
        url: "/decorate",
        templateUrl: "modules/decorate/templates/decorate.html"
      })
      .state('decorate.houses', { // 列出房产
        url: "/houses",
        controller: 'housesController',
        templateUrl: "modules/decorate/templates/houses.html"
      })
      .state('decorate.invitation', { // 申请装修
        url: "/invitation/{houseId:[0-9]+}",
        controller: 'invitationController',
        templateUrl: "modules/decorate/templates/invitation.html"
      })
      .state('decorate.prompt', { // 申请成功
        url: "/prompt/{decorateId:[0-9]+}",
        controller: 'promptController',
        templateUrl: "modules/decorate/templates/prompt.html"
      })
      .state('decorate.reference', { // 装修公司备案
        url: "/reference",
        controller: 'referenceController',
        templateUrl: "modules/decorate/templates/reference.html"
      })
      .state('decorate.progress', { // 装修进度
        url: "/progress/{decorateId:[0-9]+}",
        controller: 'progressController',
        templateUrl: "modules/decorate/templates/progress.html"
      });
  }
]);