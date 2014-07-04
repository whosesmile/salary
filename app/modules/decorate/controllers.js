/* global decorateModule:true */

// 列出房产列表
decorateModule.controller('housesController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {

    // 请求房子
    service.getHouses().then(function (res) {
      $scope.houses = res.houses;
    }, function () {
      //
    });

  }
]);

// 进度
decorateModule.controller('progressController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {
  	
  }
]);