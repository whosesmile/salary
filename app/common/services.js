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
  console.log(123)
  $http.get('.');
});