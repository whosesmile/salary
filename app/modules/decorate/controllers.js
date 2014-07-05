/* global decorateModule:true */

// 列出房产列表
decorateModule.controller('housesController', ['$scope', '$state', 'decorateService',
  function ($scope, $state, service) {

    // 请求房子
    service.getHouses().then(function (res) {

      // 根据房子的小区分组
      var temp = {};
      for (var i = 0; i < res.houses.length; i++) {
        var house = res.houses[i];
        if (!temp[house.community]) {
          temp[house.community] = [];
        }
        temp[house.community].push(house);
      }

      var groups = [];
      for (var community in temp) {
        if (temp.hasOwnProperty(community)) {
          groups.push({
            community: community,
            houses: temp[community]
          });
        }
      }

      $scope.groups = groups;
    }, function () {
      //
    });

  }
]);

// 进度
decorateModule.controller('progressController', ['$scope', '$state', '$stateParams', 'decorateService',
  function ($scope, $state, $params, service) {
    service.getProgress($params.decorateId).then(function (res) {
      $scope.progress = res.progress;
    }, function (rej) {
      // 
    });
  }
]);