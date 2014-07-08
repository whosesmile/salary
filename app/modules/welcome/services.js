/* global welcomeModule:true */

welcomeModule.factory('welcomeService', ['$http',
  function ($http) {

    return {

      getCatagory: function () {
        return $http({
          url: 'mock/welcome/catagory.json',
          method: 'get',
          cache: true
        });
      }

    };
  }
]);