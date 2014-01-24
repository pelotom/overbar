/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          define: false,
          jsyaml: false
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      build: {
        src: ['build/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['default']
      },
      typescripts: {
        files: '<%= typescript.base.src %>',
        tasks: ['default']
      }
    },
    requirejs: {
      compile: {
        options: {
          name: 'overbar',
          out: 'overbar.min.js',
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          baseUrl: './',
          packages: [{name: 'overbar', location: 'build'}]
        }
      }
    },
    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'build',
        options: {
          module: 'amd',
          target: 'es3',
          base_path: 'src',
          sourcemap: true,
          comments: true
          // noImplicitAny: true
        }
      }
    },
    release: {
      options: {
        npm: false
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task.
  grunt.registerTask('default', ['typescript', 'jshint']);
};
