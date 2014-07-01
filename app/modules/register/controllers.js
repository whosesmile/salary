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
registerModule.controller('captchaController', ['$scope', '$state', '$timeout', 'registerService', 'titleService',
  function ($scope, $state, $timeout, service, titleService) {

    $scope.submit = function () {
      $scope.processing = true;
      service.sendCaptcha().then(function (res) {
        $state.go('register.success');
      }, function (rej) {
        console.log(rej);
      })['finally'](function () {
        $scope.processing = false;
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

// 注册成功
registerModule.controller('successController', ['$scope', '$state', 'registerService',
  function ($scope, $state, service) {
    
  }
]);

// 注册失败
registerModule.controller('failureController', ['$scope', '$state', 'registerService',
  function ($scope, $state, service) {

  }
]);