/* global welcomeModule:true */

// 输入手机
welcomeModule.controller('homeController', ['$scope', '$state', 'welcomeService', '$timeout',
  function ($scope, $state, service, $timeout) {

    // 请求分类
    service.getCatagory().then(function (res) {
      $scope.catagory = res.catagory;
    }, function () {
      //
    });

  }
]);