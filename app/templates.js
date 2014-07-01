angular.module('templates', ['modules/register/templates/captcha.html', 'modules/register/templates/mobile.html', 'modules/register/templates/register.html']);

angular.module("modules/register/templates/captcha.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/captcha.html",
    "<form role=\"form\" name=\"captchaForm\" ng-submit=\"submit()\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"number\" name=\"\" class=\"form-control\" id=\"inputCapcha\" placeholder=\"请输入验证码\" cs-focus required ng-pattern=\"/\\d{4,}/\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <button type=\"submit\" class=\"btn btn-primary full-width\" ng-disabled=\"captchaForm.$invalid\">注册账号</button>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <small ng-if=\"!resend\">{{ remaining }}秒后可重新发送</small>\n" +
    "    <a ng-if=\"resend\" class=\"small\">重发验证码</a>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("modules/register/templates/mobile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("modules/register/templates/mobile.html",
    "<form role=\"form\" name=\"mobileForm\" ng-submit=\"submit()\">\n" +
    "  <div class=\"form-group form-group-first\">\n" +
    "    <input type=\"number\" name=\"mobile\" ng-model=\"mobile\" class=\"form-control\" id=\"inputMobile\" placeholder=\"请输入手机号码\" cs-focus required ng-pattern=\"/\\d{11}/\" />\n" +
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
