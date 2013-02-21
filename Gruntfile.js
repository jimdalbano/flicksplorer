/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    jshint: {
      options: {
        curly:   true,
        eqeqeq:  true,
        immed:   true,
        latedef: true,
        newcap:  true,
        noarg:   true,
        sub:     true,
        undef:   true,
        boss:    true,
        eqnull:  true,
        browser: true,
        devel:   true,
        debug:   true,
        globals: {
          // app
          App:        true,
          // stackexchange
          SE:         true,
          // neuter
          require:    true,
          // jquery
          jQuery:     true,
          $:          true,
          // ember
          Ember:      true,
          Em:         true,
          DS:         true,
          // sinon
          sinon:      true,
          // mocha
          describe:   true,
          before:     true,
          after:      true,
          beforeEach: true,
          afterEach:  true,
          it:         true,
          done:       true,
          assert:     true,
          expect:     true,
          should:     true,
          setup:      true,
          teardown:   true,
          suite:      true,
          test:       true
        }
      },

      app:  ['Gruntfile.js', 'lib/js/**/*.js'],
      test: ['test/specHelper.js', 'test/support/**/*.js', 'test/specs/**/*.js']
    },

    neuter: {
      app: {
        options: {
          filepathTransform: function(filepath){ return 'lib/js/' + filepath; }
        },
        files: {'www/app.js': ['lib/js/**/*.js']}
      },
      test: {
        options: {
          filepathTransform: function(filepath){ return 'test/' + filepath; }
        },
        files: {'www/tests.js': ['test/specHelper.js', 'test/support/**/*.js', 'test/specs/**/*.js']}
      }
    },

    copy: {
      app:         {expand: true, cwd: 'lib/', src: ['index.html'], dest: 'www/'},
      app_css:     {expand: true, cwd: 'lib/css/', src: ['app.css'], dest: 'www/'},
      app_images:  {expand: true, cwd: 'lib/images/', src: ['*'], dest: 'www/images/'},
      test:        {expand: true, cwd: 'test/', src: ['test.html'], dest: 'www/'},
      test_css:    {expand: true, cwd: 'test/vendor/', src: ['mocha.css'], dest: 'www/'},
      test_images: {expand: true, cwd: 'test/vendor/images', src: ['*'], dest: 'www/images/'}
    },

    concat: {
      vendor: {
        files: {'www/vendor.js': [
          'lib/vendor/js/jquery.js',
          'lib/vendor/js/ember.js',
          'lib/vendor/js/ember-data.js'
        ]}
      },
      test_vendor: {
        files: {'www/test_vendor.js': [
          'test/vendor/mocha.js',
          'test/vendor/chai.js',
          'test/vendor/chai-jquery.js',
          'test/vendor/sinon.js'
        ]}
      }
    },

    notify : {
      www : {
        options: {
          message : 'Carry on ...',
          title : 'Build complete'
        }
      }
    },

    watch: {
      files: ['Gruntfile.js', 'lib/**/*', 'test/**/*'],
      tasks: ['app', 'test', 'notify:www']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('app', ['jshint:app', 'neuter:app', 'copy:app', 'copy:app_css', 'copy:app_images']);
  grunt.registerTask('test', ['jshint:test', 'neuter:test', 'copy:test', 'copy:test_css', 'copy:test_images']);
  grunt.registerTask('vendor', ['concat:vendor', 'concat:test_vendor']);

  grunt.registerTask('default', ['app', 'test', 'vendor', 'notify:www', 'watch']);

};
