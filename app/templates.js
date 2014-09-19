angular.module('templates', ['common/templates/layout.partial.html', 'modules/home/templates/examine.html', 'modules/home/templates/home.html', 'modules/home/templates/salary.html', 'modules/home/templates/skill.html']);

angular.module("common/templates/layout.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/templates/layout.partial.html",
    "<div class=\"ui-view\"></div>");
}]);

angular.module("modules/home/templates/examine.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/examine.html",
    "<h1 class=\"text-center\">{{ question.title }}</h1><h4 class=\"center-block\">{{ question.subtitle }}</h4><div class=\"questions\"><table class=\"table\"><tbody><tr ng-repeat=\"item in question.options\" ng-class=\"{active: item.$active}\" ng-click=\"choose(item)\"><td class=\"radio\"><i></i></td><td class=\"option\">{{ item.desc }}</td></tr></tbody></table></div>");
}]);

angular.module("modules/home/templates/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/home.html",
    "<div class=\"sprite sprite-logo center-block\"></div><a class=\"sprite sprite-start center-block\" ui-sref=\"skill\"></a>");
}]);

angular.module("modules/home/templates/salary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/salary.html",
    "<div class=\"sprite sprite-over center-block\"></div><h3 class=\"text-center\">恭喜你，你的年薪是</h3><h1 class=\"text-center\">{{ salary | salary }}</h1><div class=\"conclusion\"><hr><p>当然这些都只是预估啦，薪水神马的不仅仅跟技术水平相关，还跟地域、行业、公司都有关系。</p><p>可是想要在技术领域里做出一点成绩来，还是需要多了解一些大牛们的技术体系，<a>点击这里</a>去看下高薪职位对应<a>技能树</a>吧~</p><p>或者先分享给朋友们，嘚瑟一下~</p><a class=\"btn btn-primary btn-block\">绝不能一个人享，分享给朋友</a></div>");
}]);

angular.module("modules/home/templates/skill.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/home/templates/skill.html",
    "<ul class=\"list-unstyled skill-list center-block\"><li ng-repeat=\"name in list\"><a ui-sref=\"examine({skill: name})\"><span>{{ name }}</span>程序员</a></li></ul>");
}]);
