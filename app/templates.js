angular.module('templates', ['modules/register/templates/captcha.html', 'modules/register/templates/failure.html', 'modules/register/templates/mobile.html', 'modules/register/templates/register.html', 'modules/register/templates/success.html']);

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
    "<div class=\"container-fluid\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\" ui-view></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("modules/register/templates/success.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/success.html",
    "<p class=\"text-center mg-vt-30\">恭喜你，注册成功！</p>\n" +
    "<a href=\"\" class=\"btn btn-primary full-width\">立即完善资料</a>\n" +
    "\n" +
    "<p class=\"text-center mg-vt-15\">\n" +
    "  <a href=\"\">返回我的管家</a>\n" +
    "</p>");
}]);
