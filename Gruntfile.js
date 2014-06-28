/* global module:false, require:true */
module.exports = function (grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

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
        exclude: ['json2', 'html5shiv'],
        fileTypes: {},
        ignorePath: '',
        overrides: {}
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dev: {
        src: ['app/app.js', 'app/common/**/*.js', 'app/modules/**/*.js'],
        dest: '<%= config.folder %>/smile.js' // ^ ^
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dev: {
        src: '<%= concat.folder.dest %>',
        dest: 'folder/<%= pkg.name %>.min.js'
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
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      dev: {
        files: ['<%= jshint.dev.src %>'],
        tasks: ['concat:dev']
      },
      html: {
        files: 'app/index.html',
        tasks: ['copy:html']
      }
    },
    connect: {
      dev: {
        options: {
          // 经过测试 connect插件会依照base的定义顺序检索文件
          // 这意味着如果存在相同文件，定义在前面的会优先返回
          base: ['<%= config.folder %>', '.'],
          port: 8888,
          // open: true,
          livereload: true,
          hostname: 'localhost',
          middleware: function (connect, options, middlewares) {
            var fs = require('fs');
            var path = require('path');
            var support = ['POST', 'PUT', 'DELETE'];
            middlewares.unshift(function (req, res, next) {
              // 单独处理POST请求 请求的地址必须是文件 这里没有进行rewrite处理
              if (support.indexOf(req.method.toUpperCase()) != -1) {
                var filepath = path.join(options.base[0], req.url);
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
      html: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.html'],
          dest: '<%= config.folder %>'
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
    grunt.task.run(['clean:dev', 'copy:dev', 'concat:dev', 'connect:dev', 'watch']);
  });

  grunt.registerTask('build', function () {
    grunt.config('config.folder', 'build');
    grunt.task.run(['clean:dev', 'copy:dev', 'concat:dev', 'connect:dev', 'watch']);
  });

};