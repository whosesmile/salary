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