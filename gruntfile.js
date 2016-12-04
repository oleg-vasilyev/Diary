
module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks("grunt-jscs");

  grunt.initConfig({

    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 0
        },
        files: {
          'wwwroot/styles.css': 'wwwroot/styles.less'
        }
      }
    },

    watch: {
      styles: {
        files: ['wwwroot/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        port: 9876,
        singleRun: false,
        autoWatch: true,
        browsers: ['Chrome'],
        logLevel: 'INFO'
      },
      files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-material/angular-material.js',

        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/angular-material/angular-material-mocks.js',

        'wwwroot/mdxUtil.js',
        'wwwroot/guidGenerator.js',
        'wwwroot/task.js',
        'wwwroot/dairy.js',
        'wwwroot/dairyApp.module.js',
        'wwwroot/tasksStoreService.js',
        'wwwroot/dairyService.js',
        'wwwroot/dairy.component.js',
        'wwwroot/calendar.component.js',
        'wwwroot/task-list.component.js',
        'test/*.js'
      ]
    },

    jshint: {
      all: grunt.file.readJSON('path.json')
    },

    jscs: {
      src: grunt.file.readJSON('path.json'),
      options: {
        config: ".jscsrc",
        fix: false
      }
    },

    githooks: {
      all: {
        'pre-commit': ''
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          src: 'wwwroot/styles.css'
        }]
      }
    },

    autoprefixer: {
      development: {
        browsers: ['last 2 version', 'ie 9'],
        expand: true,
        flatten: true,
        src: 'wwwroot/styles.css'
      }
    },

  });

  grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('rel', ['less', 'autoprefixer', 'cssmin']);

};

