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
      },
      amd: {
        src: 'src/build/backbone.syphon.amd.js',
        dest: 'lib/amd/backbone.syphon.js'
      }
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        src: '<%= preprocess.build.dest %>',
        dest: 'lib/backbone.syphon.js'
      },
      amd: {
        src: '<%= preprocess.amd.dest %>',
        dest: 'lib/amd/backbone.syphon.js'
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
      },
      amd: {
        src: '<%= concat.amd.dest %>',
        dest: 'lib/amd/backbone.syphon.min.js'
      }
    }
  });

  grunt.registerTask('build', [
    'clean:lib',
    'preprocess',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
