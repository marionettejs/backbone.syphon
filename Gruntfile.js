module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      version: '<%= pkg.version %>',
      banner: (
        '// Backbone.Syphon, v<%= meta.version %>\n' +
        '// Copyright (c) <%= grunt.template.today("yyyy") %> Derick Bailey, Muted Solutions, LLC.\n' +
        '// Distributed under MIT license\n' +
        '// http://github.com/marionettejs/backbone.syphon\n'
      )
    },

    clean: {
      lib: 'lib/',
      tmp: 'tmp/'
    },

    preprocess: {
      lib: {
        src: 'src/build/backbone.syphon.js',
        dest: 'lib/backbone.syphon.js'
      },

      tmp: {
        src: 'src/build/backbone.syphon.js',
        dest: 'tmp/backbone.syphon.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        sourceMap: true
      },
      lib: {
        src: '<%= preprocess.lib.dest %>',
        dest: 'lib/backbone.syphon.min.js'
      }
    },

    jasmine: {
      tests: {
        src: [
          'tmp/backbone.syphon.js'
        ],
        options: {
          specs: 'spec/javascripts/*.spec.js',
          vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'spec/javascripts/helpers/jasmine-jquery.js',
            'spec/javascripts/helpers/SpecHelper.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:lib',
    'preprocess:lib',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'preprocess:tmp',
    'jasmine',
    'clean:tmp'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
