/* global decorateModule:true */

// 输入手机
decorateModule.controller('housesController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {

    // 请求房子
    service.getHouses().then(function (res) {
      $scope.houses = res.list;
    }, function () {
      //
    });

  }
]);