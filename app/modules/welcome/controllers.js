/* global welcomeModule:true */

// 输入手机
welcomeModule.controller('homeController', ['$scope', '$state', 'welcomeService',
  function ($scope, $state, service) {

    // 请求分类
    service.getCatagory().then(function (res) {
      $scope.catagory = res.list;
    }, function () {
      //
    });

  }
]);