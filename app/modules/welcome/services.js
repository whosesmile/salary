/* global welcomeModule:true */

welcomeModule.factory('welcomeService', ['$http', '$timeout',
  function ($http, $timeout) {

    return {

      getCatagory: function () {
        return $http({
          url: 'mock/welcome/catagory.json',
          method: 'get'
        });
      }

    };
  }
]);