homeModule.controller('skillController', function ($scope, homeService) {
  homeService.listSkill().then(function (res) {
    $scope.list = res.list;
  });
});

homeModule.controller('examineController', function ($scope, $state, $stateParams, $timeout, homeService) {

  var list = null;
  var answers = [];

  var next = function () {
    if (answers.length === list.length) {
      $state.go('salary', {
        salary: calculate()
      });
    }
    $scope.question = list[answers.length];
  };

  var calculate = function () {
    // forEach answers cal ...
    return 1000;
  };

  $scope.choose = function (answer) {
    answers.push(answer);
    answer.$active = true;
    $timeout(next, 200);
  };

  homeService.getQuestions($stateParams.skill).then(function (res) {
    list = res.list;
    next();
  });

});

homeModule.controller('salaryController', function ($scope, $state, $stateParams) {
  $scope.salary = $stateParams.salary;
});