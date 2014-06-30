/*! angular-scaffold - v0.1.0 - 2014-06-29
* Copyright (c) 2014 whosesmile; Licensed GPLv2 */
// Avoid console errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Make Array support indexOf and trim in ie7 and ie8
(function () {
  if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (obj) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }

  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
})();

// Initialize
var app = angular.module('app', ['ui.router', 'demoModule']);


// HTTP拦截器
app.config(['$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push(['$q',
      function ($q) {
        return {
          request: function (config) {
            return config || $q.when(config)
          },
          response: function (response) {
            return response || $q.when(response);
          },
          requestError: function (rejection) {
            return $q.reject(rejection)
          },
          responseError: function (rejection) {
            return $q.reject(rejection)
          }
        };
    }]);
  }
]);

// TEST
app.run(function($http) {
  $http({
    method: 'post',
    url: 'mock/welcome.json'
  })
});
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




