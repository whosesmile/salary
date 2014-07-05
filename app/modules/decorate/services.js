/* global decorateModule:true */

decorateModule.factory('decorateService', ['$http',
  function ($http) {

    return {

      getHouses: function () {
        return $http({
          url: 'mock/decorate/houses.json',
          method: 'get'
        });
      },

      getProgress: function (decorateId) {
        return $http({
          url: 'mock/decorate/progress.json',
          method: 'get',
          params: {
            decorateId: decorateId
          }
        });
      }

    };
  }
]);