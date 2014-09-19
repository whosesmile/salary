app.directive('csLayout', function ($rootScope) {
  return {
    restrict: 'A',
    templateUrl: 'common/templates/layout.partial.html',
    link: function (scope, element, attrs) {
      $rootScope.$on('$stateChangeSuccess', function (e, state) {
        element.attr('class', state.name.replace(/\./g, '-'));
      });
    }
  };
});