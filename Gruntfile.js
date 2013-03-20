/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    jshint: {
      app:  ['src/js/**/*.js'],
      test: ['test/*_helper.js', 'test/support/**/*.js', 'test/tests/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    neuter: {
      app: {
        options: {
          filepathTransform: function(filepath){ return 'src/js/' + filepath; }
        },
        src: 'src/js/**/*.js',
        dest: 'build/app.js'
      },
      test: {
        src: ['test/test/unit/*_helper.js', 'test/tests/unit/**/*.js'],
        dest: 'build/tests.js'
      }
    },

    copy: {
      html: {
        src: 'src/index.html', dest: 'build/index.html'
      },
      test_html: {
        src: 'test/test.html', dest: 'build/test.html'
      },
      test_css: {
        src: 'test/vendor/mocha.css', dest: 'build/mocha.css'
      },
      test_images: {
        expand: true,
        cwd: 'test/vendor/images',
        src: ['**'],
        dest: 'build/images'}
    },

    concat: {
      vendor: {
        src: ['src/vendor/js/jquery-1.9.1.js',
              'src/vendor/js/handlebars.js',
              'src/vendor/js/ember.js',
              'src/vendor/js/ember-data.js',
              'src/vendor/js/boostrap.js'],
        dest:'build/vendor.js'
      },
      test_vendor: {
        src: ['test/vendor/mocha.js',
              'test/vendor/chai.js',
              'test/vendor/chai-jquery.js',
              'test/vendor/sinon-1.6.0.js'],
        dest: 'build/test_vendor.js'
      }
    },

    notify : {
      build : {
        options: {
          message : 'Carry on ...',
          title : 'Build complete'
        }
      }
    },

    ember_templates: {
      app: {
        options: {
          templateName: function(libFile) {
            return libFile.replace(/src\/templates\//, '');
          }
        },
        files: {'build/templates.js': ['src/js/templates/**/*.hbs']}
      }
    },

    watch: {
      files: ['Gruntfile.js', 'src/**/*', 'lib/**/*', 'test/**/*'],
      tasks: ['app', 'test', 'do-sass', 'notify:build', 'casperjs']
    },

    casperjs: {
      options: {},
      files:
        ['test/tests/integration/site_test.js']
    },

    sass: {
      dist: {
        files: {
          'build/main.css': 'src/css/main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('app', [/*'jshint:app',*/'ember_templates', 'copy:html',  'neuter:app']);
  grunt.registerTask('test', [/*'jshint:test',*/ 'neuter:test', 'copy:test_html', 'copy:test_css', 'copy:test_images']);
  grunt.registerTask('vendor', ['concat:vendor', 'concat:test_vendor']);
  grunt.registerTask('casp', ['casperjs']);
  grunt.registerTask('do-sass', ['sass'])
  grunt.registerTask('default', ['app', 'test', 'vendor', 'notify:build', 'watch']);
};
