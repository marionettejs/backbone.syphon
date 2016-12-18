module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      version: '<%= pkg.version %>',
      banner:
        '// Backbone.Syphon, v<%= meta.version %>\n' +
        '// ----------------------------------\n' +
        '//\n' +
        '// Copyright (c) <%= grunt.template.today("yyyy") %> Derick Bailey, Muted Solutions, LLC.\n' +
        '// Distributed under MIT license\n' +
        '//\n' +
        '// http://github.com/marionettejs/backbone.syphon\n'
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

    concat: {
      options: {
        banner: '<%= meta.banner %>'
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
          jshintrc: '.jshintrc',
          reporterOutput: ''
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

    lintspaces: {
      all: {
        src: [
          'src/*.js'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    jscs: {
      options: {
        config: ".jscsrc",
        force: true
      },

      syphon: {
        files: {
          src: [ 'src/*.js' ]
        }
      },

      specs: {
        files: {
          src: ['spec/javascripts/**.js']
        },
        options: {
          maximumLineLength: 200
        }
      }
    },

    watch: {
      syphon: {
        options: {
          spawn: false
        },
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['test']
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


  grunt.registerTask('default', 'An alias task for running tests.', ['test']);

  grunt.registerTask('lint', 'Lints our sources', ['lintspaces', 'jshint', 'jscs']);

  grunt.registerTask('test', 'Run the unit tests.', ['lint', 'preprocess:tmp', 'mochaTest']);

  grunt.registerTask('dev', 'Auto-lints while writing code.', ['test', 'watch:syphon']);

  grunt.registerTask('build', 'Builds the library', [
    'clean', 'lint', 'preprocess', 'template', 'concat', 'uglify'
  ]);
};
