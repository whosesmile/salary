/* global module:false, require:true */
module.exports = function (grunt) {

  var fs = require('fs');
  var path = require('path');
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      develop: {
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
      develop: {
        files: '<%= jshint.develop.src %>',
        tasks: ['jshint:develop']
      }
    },
    connect: {
      develop: {
        options: {
          base: ['app', '.'],
          port: 8888,
          // open: true,
          livereload: true,
          hostname: 'localhost'
        }
      }
    }
  });

  // connect 和 watch 都会阻塞进程，为了防止watch阻塞connect 将watch放在connect后边 同时不要设定connect的keepalive
  grunt.registerTask('default', function () {
    grunt.task.run(['connect:develop', 'watch:develop']);
  });

};