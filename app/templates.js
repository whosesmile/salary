angular.module('templates', ['modules/decorate/templates/decorate-progress.partial.html', 'modules/decorate/templates/decorate.html', 'modules/decorate/templates/houses.html', 'modules/decorate/templates/progress.html', 'modules/register/templates/captcha.html', 'modules/register/templates/failure.html', 'modules/register/templates/mobile.html', 'modules/register/templates/register.html', 'modules/register/templates/success.html', 'modules/welcome/templates/home.html']);

angular.module("modules/decorate/templates/decorate-progress.partial.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/decorate-progress.partial.html",
    "<dd>\n" +
    "  <a ui-sref=\"decorate.houses\" class=\"desc\">\n" +
    "    <span class=\"status pull-right\" ng-hide=\"!action\" ng-class=\"{'text-light': muted}\">{{ action }}</span>\n" +
    "    <span class=\"apartment text-default\" ng-transclude></span>\n" +
    "  </a>\n" +
    "  <ul class=\"list-unstyled text-muted small\" ng-if=\"group\">\n" +
    "    <li class=\"clearfix\" ng-repeat=\"item in group\">\n" +
    "      <span class=\"pull-left\">{{ item.time|date:'yyyy-MM-dd HH:mm' }}</span>\n" +
    "      <span class=\"pull-right\">{{ item.status|decorateStatus }}</span>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</dd>\n" +
    "\n" +
    "");
}]);

angular.module("modules/decorate/templates/decorate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/decorate.html",
    "<div id=\"decorate\" class=\"wrapper\">\n" +
    "  <div ui-view></div>\n" +
    "</div>");
}]);

angular.module("modules/decorate/templates/houses.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/houses.html",
    "<div class=\"have-house\" ng-if=\"groups.length > 0\">\n" +
    "  <dl class=\"terms\" ng-repeat=\"group in groups\">\n" +
    "    <dt class=\"small text-light\">{{ group.community }}</dt>\n" +
    "    <dd ng-repeat=\"house in group.houses\">\n" +
    "      <a class=\"desc\" ui-sref=\"decorate.progress({decorateId: house.decorateId})\">\n" +
    "        <span class=\"status pull-right\" ng-class=\"{'text-muted': house.status === 2}\">{{ house.status|houseStatus }}</span>\n" +
    "        <span class=\"apartment text-default\">{{ house.apartment }}</span>\n" +
    "      </a>\n" +
    "    </dd>\n" +
    "  </dl>\n" +
    "  <div class=\"correction small text-muted\">\n" +
    "    <p>房间信息不对？</p>\n" +
    "    <p>请联系客服确认：<a href=\"tel:01060898888\">010-60898888</a></p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"havent-house\" ng-if=\"groups.length === 0\">\n" +
    "  <div class=\"correction small\">\n" +
    "    <p>啊哦，系统未搜索到与您相关的房间信息~ <br />其实您有相关的房间？</p>\n" +
    "    <p>请联系客服确认：<a href=\"tel:01060898888\">010-60898888</a></p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!-- <div class=\"container-fluid full-width\" style=\"position:absolute;bottom:10px;\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12 col-sm-12\">\n" +
    "      <button class=\"btn btn-primary full-width\">测试按钮</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div> -->");
}]);

angular.module("modules/decorate/templates/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/decorate/templates/progress.html",
    "<div class=\"decorate-progress\">\n" +
    "  <div class=\"title small text-light\">北京时代天街10栋1单元1601室 装修单</div>\n" +
    "  <dl class=\"terms\">\n" +
    "    <decorate-progress stage=\"before\" items=\"progress\">在线提交装修许可申请</decorate-progress>\n" +
    "  </dl>\n" +
    "  <dl class=\"terms\">\n" +
    "    <decorate-progress stage=\"process\" items=\"progress\">现场办理装修许可</decorate-progress>\n" +
    "  </dl>\n" +
    "  <dl class=\"terms\">\n" +
    "    <decorate-progress stage=\"after\" items=\"progress\">在线申请验收&amp;押金退款</decorate-progress>\n" +
    "  </dl>\n" +
    "</div>");
}]);

angular.module("modules/register/templates/captcha.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/captcha.html",
    "<form role=\"form\" name=\"captchaForm\" ng-submit=\"submit()\" autocomplete=\"false\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"text\" name=\"captcha\" ng-model=\"captcha\" class=\"form-control\" id=\"inputCapcha\" placeholder=\"请输入验证码\" cs-number cs-focus required ng-pattern=\"/^\\d{4,8}$/\" ng-if=\"!message\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group form-group-first has-error\" ng-if=\"message\" ng-click=\"$parent.message=''\">\n" +
    "    <input type=\"text\" name=\"message\" ng-model=\"message\" class=\"form-control no-bg\" readonly />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"captchaForm.$invalid || processing\">\n" +
    "      <span ng-hide=\"processing\">{{ submitText || '注册账号' }}</span><span ng-show=\"processing\">请稍后...</span>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <small ng-if=\"!resend\">{{ remaining }}秒后可重新发送</small>\n" +
    "    <a ng-if=\"resend\" class=\"small\" ng-click=\"refresh()\">重发验证码</a>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("modules/register/templates/failure.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/failure.html",
    "<p class=\"text-center text-danger mg-vt-30\">验证码输入有误，请重新输入！</p>\n" +
    "<a ui-sref=\"register.captcha\" class=\"btn btn-primary full-width\">重新验证</a>");
}]);

angular.module("modules/register/templates/mobile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/mobile.html",
    "<form role=\"form\" name=\"mobileForm\" ng-submit=\"submit()\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"text\" name=\"mobile\" ng-model=\"mobile\" class=\"form-control\" id=\"inputMobile\" placeholder=\"请输入手机号码\" cs-number required ng-pattern=\"/^\\d{11}$/\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"mobileForm.$invalid\">获取验证码</button>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("modules/register/templates/register.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/register.html",
    "<div id=\"register\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-12 col-sm-12\" ui-view></div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/register/templates/success.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/success.html",
    "<p class=\"text-center mg-vt-30\">恭喜你，注册成功！</p>\n" +
    "<a href=\"\" class=\"btn btn-primary full-width\">立即完善资料</a>\n" +
    "\n" +
    "<p class=\"text-center mg-vt-15\">\n" +
    "  <a href=\"#/home\">返回我的管家</a>\n" +
    "</p>");
}]);

angular.module("modules/welcome/templates/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/welcome/templates/home.html",
    "<div id=\"welcome\" style=\"background:#FFF\">\n" +
    "  <header id=\"header\">\n" +
    "    <span class=\"glyphicon glyphicon-map-marker\"></span>\n" +
    "    <span class=\"city\">北京</span>\n" +
    "    <span class=\"community\">龙湖社区</span>\n" +
    "  </header>\n" +
    "  <div id=\"content\">\n" +
    "    <div class=\"container-fluid\">\n" +
    "      <div class=\"row\" ng-repeat=\"items in catagory|group:3\">\n" +
    "        <div class=\"col-xs-4 col-sm-4\" ng-repeat=\"item in items\">\n" +
    "          <div class=\"box\">\n" +
    "            <a class=\"cell\" href=\"#/{{ item.href }}\">\n" +
    "              <span class=\"glyphicon glyphicon-fire\"></span>\n" +
    "              <span class=\"category\">{{ item.name }}</span>\n" +
    "            </a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
