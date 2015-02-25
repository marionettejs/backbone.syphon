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
      lib: {
        src: 'src/build/backbone.syphon.js',
        dest: 'lib/backbone.syphon.js'
      },
      tmp: {
        src: 'src/build/backbone.syphon.js',
        dest: 'tmp/backbone.syphon.js'
      }
    },

    template: {
      options: {
        data: {
          version: '<%= pkg.version %>'
        }
      },
      lib: {
        src: '<%= preprocess.lib.dest %>',
        dest: '<%= preprocess.lib.dest %>'
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

    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['src/**.js']
      },

      spec: {
        options: {
          jshintrc: 'spec/.jshintrc'
        },
        src: ['spec/javascripts/**.js']
      }
    },

    mochaTest: {
      spec: {
        options: {
          require: 'spec/javascripts/setup/node.js',
          reporter: 'dot',
          clearRequireCache: true,
          mocha: require('mocha')
        },
        src: [
          'spec/javascripts/setup/helpers.js',
          'spec/javascripts/*.spec.js'
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'jshint:src',
    'clean:lib',
    'preprocess:lib',
    'template:lib',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'preprocess:tmp',
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'build',
    'test'
  ]);
};
