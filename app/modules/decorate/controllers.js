/* global decorateModule:true */

// 列出房产列表
decorateModule.controller('housesController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {
    // 请求房子
    service.getHouses().then(function (res) {
      // 根据房子的小区分组
      var groups = {};
      for (var i = 0; i < res.houses.length; i++) {
        var house = res.houses[i];
        if (!groups[house.community]) {
          groups[house.community] = [];
        }
        groups[house.community].push(house);
      }

      $scope.groups = groups;
    }, function () {});

  }
]);

// 发起装修流程
decorateModule.controller('requestController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    service.getProviders().then(function (res) {
      $scope.providers = res.providers;
    }, function () {});
  }
]);

// 查看装修进度
decorateModule.controller('progressController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    service.getProgress($params.decorateId).then(function (res) {
      $scope.progress = res.progress;
    }, function () {});
  }
]);

// 查看备案说明
decorateModule.controller('referenceController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    // TODO
  }
]);