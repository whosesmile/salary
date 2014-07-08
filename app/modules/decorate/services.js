/* global decorateModule:true */

decorateModule.factory('decorateService', ['$http',
  function ($http) {

    return {

      // 获取业主房产明细
      getHouses: function () {
        return $http({
          url: 'mock/decorate/houses.json',
          method: 'get'
        });
      },

      // 获取装修进度信息
      getProgress: function (decorateId) {
        return $http({
          url: 'mock/decorate/progress.json',
          method: 'get',
          params: {
            decorateId: decorateId
          }
        });
      },

      // 获取供应商列表
      getProviders: function () {
        return $http({
          url: 'mock/decorate/providers.json',
          method: 'get'
        });
      },

      // 获取房屋信息
      getHouse: function (id) {
        return $http({
          url: 'mock/decorate/house.json',
          method: 'get',
          params: {
            id: id
          }
        });
      },

      // 获得装修详情
      getDecorate: function (id) {
        return $http({
          url: 'mock/decorate/decorate.json',
          method: 'get',
          params: {
            id: id
          }
        });
      },

      // 获得业主装修历史
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
      },

      // 获取装修账单
      getCharge: function (decorateId) {
        return $http({
          url: 'mock/decorate/charge.json',
          method: 'get',
          params: {
            decorateId: decorateId
          }
        });
      },

      // 验收装修工程
      sendVerify: function (decorateId) {
        return $http({
          url: 'mock/decorate/verify.json',
          method: 'post',
          data: {
            decorateId: decorateId
          }
        });
      },

      // 申请退款
      sendRefund: function (decorateId) {
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