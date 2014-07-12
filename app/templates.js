angular.module('templates', ['modules/home/templates/home.html', 'modules/test/templates/test.html']);

angular.module("modules/home/templates/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/home.html",
    "home");
}]);

angular.module("modules/test/templates/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/test/templates/test.html",
    "test");
}]);
