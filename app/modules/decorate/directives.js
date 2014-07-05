/* global decorateModule:true */

// 显示装修进度 因为需分三段显示
decorateModule.directive('decorateProgress', ['$filter',
  function ($filter) {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/decorate/templates/decorate-progress.partial.html',
      scope: {
        stage: '@',
        items: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch('items', function (items) {
          if (angular.isArray(items) && items.length > 0) {
            var section = {
              before: ['S10', 'S40'],
              process: ['S50', 'S50'],
              after: ['S60', 'S90']
            };

            // 仅显示需要的分组
            for (var i = 0; i < items.length; i++) {
              if (items[i].status === section[scope.stage][0]) {
                break;
              }
            }
            for (var j = items.length - 1; j >= 0; j--) {
              if (items[j].status === section[scope.stage][1]) {
                break;
              }
            }
            j = j + 1 || items.length; // 如果j = -1,j = length
            scope.group = items.slice(i, j);

            // 引导下一步
            var current = items[items.length - 1].status;
            if (current >= section[scope.stage][1]) {
              scope.action = '已办理';
              scope.muted = true;
            }
            else {
              scope.action = $filter('decorateGuide')(current, scope.stage);
            }
          }
        });
      }
    };
  }
]);