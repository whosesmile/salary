/**
 * 自动聚焦...
 */
app.directive('csFocus', ['$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, elem) {
        // if input is in a dialog and dialog has a animate
        // so here has a repeat check but only recursive onetime
        var times = 0;
        (function focus() {
          if (elem.is(':visible')) {
            elem.focus();
          }
          else if (times++ < 1) {
            $timeout(focus, 200);
          }
        }());
      }
    };
  }
]);