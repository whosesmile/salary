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
      },

      getProviders: function () {
        return $http({
          url: 'mock/decorate/providers.json',
          method: 'get'
        });
      },

      getHouse: function (id) {
        return $http({
          url: 'mock/decorate/house.json',
          method: 'get',
          params: {
            id: id
          }
        });
      },

      getDecorate: function (id) {
        return $http({
          url: 'mock/decorate/decorate.json',
          method: 'get',
          params: {
            id: id
          }
        });
      },

      getHistory: function () {
        return $http({
          url: 'mock/decorate/history.json',
          method: 'get'
        });
      },

      // 发送装修申请
      sendInvitation: function (houseId, decorateId, date) {
        return $http({
          url: 'mock/decorate/invitation.json',
          method: 'post',
          data: {
            houseId: houseId,
            decorateId: decorateId,
            date: date
          }
        });
      },

      // 发送提交图纸通知
      sendManualSubmit: function (decorateId) {
        return $http({
          url: 'mock/decorate/success.json',
          method: 'post',
          data: {
            decorateId: decorateId
          }
        });
      }

    };
  }
]);