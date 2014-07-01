registerModule.factory('registerService', ['$http',
  function ($http) {

    return {

      sendMobile: function () {
        return $http({
          url: 'mock/register/mobile.json',
          method: 'post'
        });
      },

      sendCaptcha: function () {
        return $http({
          url: 'mock/register/mobile.json',
          method: 'post'
        });
      },

      sendFresh: function () {
        return $http({
          url: 'mock/register/mobile.json',
          method: 'post'
        });
      }

    };
  }
]);