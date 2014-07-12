/**
 * 自动聚焦...
 */
app.directive('csFocus', ['$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element) {
        var times = 0;
        (function focus() {
          if (element.is(':visible')) {
            element.focus();
          }
          else if (times++ < 1) {
            $timeout(focus, 200);
          }
        }());
      }
    };
  }
]);

/**
 * 动态切换Input的type为Number
 * placeholder text for an input type="number" does not work in mobile webkit
 */
app.directive('csNumber', function () {
  return {
    restrict: 'A',
    replace: false,
    link: function (scope, element) {
      element.on('focus', function () {
        this.type = 'number';
      }).on('blur', function () {
        this.type = 'text';
      });
    }
  };
});

/**
 * 保持在底部效果
 */
app.directive('csBottom', ['$window', '$document',
  function ($window, $document) {
    return {
      restrict: 'A',
      replace: false,
      link: function (scope, element) {
        var listener = function () {
          element.toggleClass('keep-bottom', window.innerHeight >= $document.height());
        };

        var show = function (e) {
          // 可以调出虚拟键盘的空间类型
          var needInput = ['datetime', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week'].indexOf(e.target.type);
          if (element.hasClass('keep-bottom') && (e.target.tagName === 'TEXTAREA' || needInput)) {
            element.hide();
          }
        };

        var hide = function () {
          element.show();
        };

        $document.on('focus', 'input,textarea', show);
        $document.on('blur', 'input,textarea', hide);

        angular.element($window).on('resize', listener).resize();

        // 清理事件 防止内存泄露
        element.on('$destroy', function () {
          angular.element($window).off('resize', listener);
          $document.off('focus', 'input,textarea', show);
          $document.off('blur', 'input,textarea', hide);
        });
      }
    };
  }
]);

/**
 * The cs-Thumbnail directive
 * @author: nerv
 * @version: 0.1.2, 2014-01-09
 */
app.directive('csThumbnail', ['$window',
  function ($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function (item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function (file) {
        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas />',
      link: function (scope, element, attrs) {
        if (!helper.support) {
          return;
        }

        var params = scope.$eval(attrs.csThumbnail);

        if (!helper.isFile(params.file) || !helper.isImage(params.file)) {
          return;
        }

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({
            width: width,
            height: height
          });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };
  }
]);