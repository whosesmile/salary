// 输入手机
registerModule.controller('mobileController', ['$scope', '$state', 'registerService',
  function ($scope, $state, service) {

    $scope.submit = function () {
      service.sendMobile().then(function (res) {
        $state.go('register.captcha');
      }, function (rej) {
        console.log(rej);
      });
    };

  }
]);

// 输入验证码
registerModule.controller('captchaController', ['$scope', '$state', '$timeout', 'registerService',
  function ($scope, $state, $timeout, service) {

    $scope.submit = function () {
      service.sendCaptch().then(function (res) {

      }, function (rej) {
        console.log(rej);
      });
    };

    $scope.captcha = function () {
      service.sendFresh();
    };

    $scope.resend = false;
    $scope.remaining = 59;

    var timer = null;

    // 清理工作
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });

    // 更新时间
    (function update() {
      timer = $timeout(function () {
        $scope.remaining -= 1;
        if ($scope.remaining === 0) {
          $scope.resend = true;
        }
        else {
          update();
        }
      }, 1000);
    })();

  }
]);