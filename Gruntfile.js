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
        dest: 'build/app/app.js'
      },
      test_unit: {
        src: ['test/tests/unit/**/*.js'],
        dest: 'build/unit_tests.js'
      },
      test_acceptance: {
        src: ['test/tests/acceptance/**/*.js'],
        dest: 'build/acceptance_tests.js'
      }
    },

    copy: {
      app: {
        files: [
          {src: 'src/index.html', dest: 'build/app/index.html'},
          {expand: true, cwd: 'src/images', src: ['**'], dest: 'build/app/images'},
        ]
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
        dest:'build/app/vendor.js'
      },
      vendor_test: {
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
        files: {'build/app/templates.js': ['src/js/templates/**/*.hbs']}
      }
    },

    watch: {
      src: {
        files: ['src/js/**/*.js'],
        tasks: ['build_js']
      },
      css: {
        files: ['src/css/**/*.css', 'src/css/**/*.scss'],
        tasks: ['build_css']
      },
      assets: {
        files: ['src/index.html', 'src/images/**'],
        tasks: ['build_asssets']
      },
      vendor: {
        files: ['src/vendor/**/*.js'],
        tasks: ['build_vendor', 'notify:build']
      },
      test_acceptance: {
        files: ['test/tests/acceptance/**/*.js'],
        tasks: ['casperjs']
      },
      test_unit: {
        files: ['test/tests/unit/**/*.js'],
        tasks: ['build_js_test_unit']
      }
    },

    casperjs: {
      options: {},
      files:
        ['test/tests/acceptance/**/*.js']
    },

    sass: {
      app: {
        files: {
          'build/app/main.css': 'src/css/main.scss'
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

  grunt.registerTask('build_js', [/*'jshint:app',*/ 'ember_templates', 'neuter:app',  'notify:build'] );
  grunt.registerTask('build_js_test_unit', [/*'jshint:test_unit',*/, 'neuter:test_unit']);
  grunt.registerTask('build_js_test_acceptance', [/*'jshint:test_acceptance'*/])
  grunt.registerTask('build_css', ['sass:app']);
  grunt.registerTask('build_assets', ['copy:app']);
  grunt.registerTask('build_vendor', ['concat:vendor', 'notify:build']);
  grunt.registerTask('build_vendor_test', ['concat:vendor_test']);

  grunt.registerTask('build', ['build_js', 'build_css', 'build_assets', 'build_vendor']);

  // Build ALL the tests, and run the acceptance. Leave the unit tests up to me to deal with.
  grunt.registerTask('test', ['build_js_test_unit', 'build_js_test_acceptance', 'build_vendor_test',  'casperjs'])

  grunt.registerTask('default', ['build', 'test', 'watch']);
};
