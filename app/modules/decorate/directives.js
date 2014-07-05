/* global decorateModule:true */

// 显示装修进度 因为需分三段显示
decorateModule.directive('decorateProgress', [

  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/decorate/templates/decorate-progress.partial.html',
      scope: {
        items: '=',
        begin: '@',
        end: '@'
      },
      link: function (scope, element, attrs) {
        scope.$watch('items', function (items) {
          if (angular.isArray(items)) {
            for (var i = 0; i < items.length; i++) {
              if (items[i].status === scope.begin) {
                break;
              }
            }
            for (var j = items.length - 1; j >= 0; j--) {
              if (items[j].status === scope.end) {
                break;
              }
            }

            j = j + 1 || items.length;
            scope.group = items.slice(i, j);
          }
        });
      }
    };
  }
]);