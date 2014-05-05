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
      lib: 'lib/'
    },

    preprocess: {
      build: {
        src: 'src/build/backbone.syphon.js',
        dest: 'lib/backbone.syphon.js'
      }
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        src: '<%= preprocess.build.dest %>',
        dest: 'lib/backbone.syphon.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        sourceMap: true
      },
      build: {
        src: '<%= concat.build.dest %>',
        dest: 'lib/backbone.syphon.min.js'
      }
    },

    jasmine: {
      tests: {
        src: [
          'src/backbone.syphon.js',
          'src/backbone.syphon.typeregistry.js',
          'src/backbone.syphon.keyextractors.js',
          'src/backbone.syphon.inputreaders.js',
          'src/backbone.syphon.inputwriters.js',
          'src/backbone.syphon.keyassignmentvalidators.js',
          'src/backbone.syphon.keysplitter.js',
          'src/backbone.syphon.keyjoiner.js'
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
    'preprocess',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'jasmine'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);

};
