/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-rigger');

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.4.1',
      banner: '// Backbone.Syphon, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Derick Bailey, Muted Solutions, LLC.\n' + 
        '// Distributed under MIT license\n' + 
        '// http://github.com/derickbailey/backbone.syphon'
    },

    lint: {
      files: ['src/backbone.syphon.js']
    },

    rig: {
      build: {
        src: ['<banner:meta.banner>', 'src/backbone.syphon.js'],
        dest: 'lib/backbone.syphon.js'
      },
      amd: {
        src: ['<banner:meta.banner>', 'src/amd.js'],
        dest: 'lib/amd/backbone.syphon.js'
      }
    },

    min: {
      standard: {
        src: ['<banner:meta.banner>', '<config:rig.build.dest>'],
        dest: 'lib/backbone.syphon.min.js'
      },
      amd: {
        src: ['<banner:meta.banner>', '<config:rig.amd.dest>'],
        dest: 'lib/amd/backbone.syphon.min.js'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: true,
        _: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint rig min');

};
