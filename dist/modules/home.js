/*! qd-backend - v0.1.0 - 2014-09-22 12:54:22
* Copyright (c) 2014 lovemoon@yeah.net; Licensed GPLv2 */
// Initialize
var app = angular.module('app', ['ui.router', 'templates', 'homeModule']);

// bootstrap
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
// HTTP拦截器
app.config(['$httpProvider',
  function ($httpProvider) {
    // POST method use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    // Override transformRequest to serialize form data like jquery
    $httpProvider.defaults.transformRequest = [

      function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? serialize(data) : data;
      }
    ];

    // Add interceptor
    $httpProvider.interceptors.push(['$q', '$injector',
      function ($q, $injector) {
        return {
          request: function (config) {
            // REST 风格路由重写
            var rules = config.url.match(/:(\w+)/g);
            if (rules !== null) {
              angular.forEach(rules, function (rule) {
                var name = rule.substring(1);
                if (config.params && config.params.hasOwnProperty(name)) {
                  config.url = config.url.replace(rule, config.params[name]);
                  delete config.params[name];
                }
                else if (config.data && config.data.hasOwnProperty(name)) {
                  config.url = config.url.replace(rule, config.data[name]);
                  delete config.data[name];
                }
              });
            }

            return $q.when(config);
          },
          response: function (response) {
            if (angular.isObject(response.data)) {
              var res = response.data;
              // 兼容旧数据格式 {code:0, message: '', data: {...}} --> {code:200, data: {message: '', ...}}
              res.data = res.data || {};
              if (res.data.message || res.message) {
                res.data.message = res.data.message || res.message;
              }
              // 如果返回结果失败 清理缓存 防止缓存错误
              if ([0, 200].indexOf(res.code) === -1) {
                $injector.get('$cacheFactory').get('$http').removeAll();
              }

              // 默认自动拆包
              if (response.config.$parsing !== false) {
                if ([0, 200].indexOf(res.code) !== -1) {
                  return res.data;
                }
                else {
                  if (response.config.$silence !== true) {
                    alert(res.data.message || '不好意思，服务器开小差了。');
                  }
                  return $q.reject(res.data);
                }
              }
              // 不拆包则返回服务器响应
              else {
                return $q.when(response.data);
              }
            }
            return $q.when(response);
          },
          requestError: function (rejection) {
            return $q.reject(rejection);
          },
          responseError: function (rejection) {
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

app.run(function ($rootScope) {
  $rootScope.title = '千丁小区';

  var map = {
    'IT民工薪资测试': ['home'],
    '选择职业': ['skill'],
    '技能测试': ['examine'],
    '测试结果': ['salary']
  };

  // 改变网页标题
  $rootScope.$on('$stateChangeSuccess', function (e, state, params, fromState, fromParams) {
    for (var key in map) {
      if (map.hasOwnProperty(key) && map[key].indexOf(state.name) !== -1) {
        $rootScope.title = key;
      }
    }
  });
});

// 配置HTML5模式，不过需要后台配合，不然会出现404
app.config(function ($locationProvider) {
  // $locationProvider.html5Mode(false);
});

// 关闭微信底部导航
app.run(['$rootScope',
  function ($rootScope) {

    var bridge = function () {
      WeixinJSBridge.call('hideToolbar');
    };

    $rootScope.$on('$stateChangeStart', function (e) {
      if (typeof WeixinJSBridge === "undefined") {
        document.addEventListener('WeixinJSBridgeReady', bridge, false);
      }
      else {
        bridge();
      }
    });
  }
]);
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
// 为了分割数组以便二次使用ng-repeat
// 通常需要的场景是你需要每隔N个元素插入分组节点
// 如果你修改items内部元素的属性 angular会自动watch更新
// 如果动态增删items的元素，要删除items.$rows，以便重新计算

app.filter('group', function() {
  return function(items, cols) {
    if (!items) {
      return items;
    }
    // if items be modified, delete cache
    if (items.$rows) {
      var temp = [];
      for (var i = 0; i < items.$rows.length; i++) {
        temp = temp.concat(items.$rows[i]);
      }

      if (temp.length !== items.length) {
        delete items.$rows;
      } else {
        for (var j = 0; j < items.length; j++) {
          if (items[j] !== temp[j]) {
            delete items.$rows;
            break;
          }
        }
      }
    }

    // cache rows for angular dirty check
    if (!items.$rows) {
      var rows = [];
      for (var k = 0; k < items.length; k++) {
        if (k % cols === 0) {
          rows.push([]);
        }
        rows[rows.length - 1].push(items[k]);
      }
      items.$rows = rows;
    }

    return items.$rows;
  };
});

// 判断是否是空白对象
app.filter('empty', function() {
  return function(obj) {
    return !obj || angular.equals({}, obj) || angular.equals([], obj);
  };
});

// 取两个数最小的
app.filter('min', function() {
  return function(num, limit) {
    return Math.min(num, limit);
  };
});

// 取两个数最大的
app.filter('max', function() {
  return function(num, limit) {
    return Math.max(num, limit);
  };
});

// 安全过滤 配合 ng-bind-html 使用
app.filter('safe', ['$sce',
  function($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }
]);

// 是否判断
app.filter('is', function() {
  return function(status, bool) {
    bool = angular.isUndefined(bool) ? true : bool;
    status = bool ? status : !status;
    return status ? '是' : '否';
  };
});
var serialize = function (obj) {
  var query = '';
  var name, value, fullSubName, subName, subValue, innerObj, i;

  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += serialize(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          if (value.hasOwnProperty(subName)) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += serialize(innerObj) + '&';
          }
        }
      }
      else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
  }

  return query.length ? query.substr(0, query.length - 1) : query;
};
// define module
var homeModule = angular.module('homeModule', ['ui.router']);

// config router
homeModule.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "modules/home/templates/home.html"
      })
      .state('skill', {
        url: "/skill",
        templateUrl: "modules/home/templates/skill.html",
        controller: 'skillController'
      })
      .state('examine', {
        url: "/examine/:skill",
        templateUrl: "modules/home/templates/examine.html",
        controller: 'examineController'
      })
      .state('salary', {
        url: "/salary/:salary",
        templateUrl: "modules/home/templates/salary.html",
        controller: 'salaryController'
      });
  }
]);
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
    return 311320;
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

homeModule.filter('salary', function () {

  return function (input) {
    if (/^\d+$/.test(input)) {
      return (parseFloat(input) / 10000).toFixed(0) + '万';
    }
    return input;
  };

});
homeModule.factory('homeService', function ($http) {

  return {
    listSkill: function () {
      return $http({
        url: '/service/skill',
        method: 'get',
        cache: true
      });
    },

    getQuestions: function (skill) {
      return $http({
        url: '/service/questions',
        method: 'get',
        params: {
          skill: skill
        },
        cache: true
      });
    }
  };

});
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
