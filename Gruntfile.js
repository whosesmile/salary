/* global module:false, require:true */
module.exports = function (grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    bower: grunt.file.readJSON('.bowerrc'),

    config: {
      folder: 'temp'
    },

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    wiredep: {
      target: {
        src: ['app/index.html'],
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: ['json2', 'html5shiv', 'bootstrap'],
        fileTypes: {},
        ignorePath: '',
        overrides: {}
      }
    },
    html2js: {
      options: {
        module: 'templates',
        rename: function (name) {
          return name.replace('../app/', '');
        }
      },
      dev: {
        src: ['app/**/templates/*.html'],
        dest: 'app/templates.js'
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dep: {
        src: ['<%= bower.directory %>/jquery/dist/jquery.min.js',
          '<%= bower.directory %>/angular/angular.min.js',
          '<%= bower.directory %>/angular-ui-router/release/angular-ui-router.min.js',
          '<%= bower.directory %>/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ],
        dest: '<%= config.folder %>/dependencies.js' // ^ ^
      },
      dev: {
        src: ['app/app.js', 'app/common/**/*.js', 'app/modules/**/module.js', 'app/modules/**/*.js', 'app/templates.js'],
        dest: '<%= config.folder %>/application.js' // ^ ^
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        src: '<%= concat.dev.src %>',
        dest: '<%= config.folder %>/application.js' // ^ ^
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dev: {
        src: ['app/**/*.js']
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        options: {
          reload: true
        },
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: ['<%= jshint.dev.src %>'],
        tasks: ['concat:dev']
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['html2js:dev', 'concat:dev']
      },
      index: {
        files: ['app/index.html'],
        tasks: ['copy:index']
      },
      dev: {
        files: ['app/**/*', '!app/**/*.js', '!app/**/*.html'],
        tasks: ['copy:dev']
      },
      mock: {
        files: ['app/mock/**/*'],
        tasks: ['copy:mock']
      }
    },
    connect: {
      dev: {
        options: {
          // 经过测试 connect插件会依照base的定义顺序检索文件
          // 这意味着如果存在相同文件，定义在前面的会优先返回
          base: ['<%= config.folder %>', '.'],
          port: 8888,
          open: 'http://127.0.0.1:<%= connect.dev.options.port %>',
          livereload: true,
          hostname: '*',
          middleware: function (connect, options, middlewares) {
            var fs = require('fs');
            var path = require('path');
            var support = ['POST', 'PUT', 'DELETE'];
            middlewares.unshift(function (req, res, next) {
              // 单独处理POST请求 请求的地址必须是文件 这里没有进行rewrite处理
              if (support.indexOf(req.method.toUpperCase()) !== -1) {
                var filepath = path.join(options.base[0], req.url);
                if (filepath.indexOf('?') >= 0) {
                  filepath = filepath.substring(0, filepath.indexOf('?'));
                }
                if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
                  return res.end(fs.readFileSync(filepath));
                }
              }

              return next();
            });

            return middlewares;
          },
        }
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['index.html', '**/*.{ico,png,txt,gif,jpg,jpeg,css,svg,eot,ttf,woff,json}'],
          dest: '<%= config.folder %>'
        }]
      },
      dep: {
        files: [{
          expand: true,
          flatten: true,
          cwd: '<%= bower.directory %>',
          src: ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap/dist/css/bootstrap.css.map'],
          dest: '<%= config.folder %>/dependencies/bootstrap/css/'
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= bower.directory %>',
          src: ['bootstrap/dist/fonts/*'],
          dest: '<%= config.folder %>/dependencies/bootstrap/fonts/'
        }]
      },
      index: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['index.html'],
          dest: '<%= config.folder %>'
        }]
      },
      mock: {
        files: [{
          expand: true,
          cwd: 'app/mock',
          src: ['**/*'],
          dest: '<%= config.folder %>/mock'
        }]
      }
    },
    clean: {
      dev: ['<%= config.folder %>'],
    }
  });

  // connect 和 watch 都会阻塞进程 为了防止watch阻塞connect
  // 将watch放在connect后边, 同时不要设定connect的keepalive
  grunt.registerTask('default', function () {
    grunt.config('config.folder', 'temp');
    grunt.task.run(['clean:dev', 'copy:dev', 'copy:dep', 'html2js:dev', 'concat:dep', 'concat:dev', 'connect:dev', 'watch']);
  });

  grunt.registerTask('dist', function () {
    grunt.config('config.folder', 'dist');
    grunt.task.run(['clean:dev', 'copy:dev', 'copy:dep', 'html2js:dev', 'concat:dep', 'uglify:dev', 'connect:dev', 'watch']);
  });

};