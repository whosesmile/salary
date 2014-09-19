/* global serialize:true */

// Initialize
var app = angular.module('app', ['ui.router', 'templates', 'homeModule']);

// bootstrap
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});