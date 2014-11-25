/* ==========================================================================
 * grunt.js - gruntfile for Condiments
 * version 0.0.100: 2014.11.24
 * ==========================================================================
 * Copyright tjcccc
 * Licensed under MIT
 * ========================================================================== */


module.exports = function (grunt) {
  'use strict';
  
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  
  // Project configuration.
  grunt.initConfig({
    
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    
    // Task configuration.
    clean: {
      dist: "dist",
      resorted: "dev/css/resorted-*.css"
    },
    csscomb: {
      options: {
        sortOrder: ".csscomb.json",
      },
      css: {
        files: {
          "dev/css/resorted-magicodes-blog.css": ["dev/css/magicodes-blog.css"],
        },
      },
    },
    concat: {
      options: {
        banner: "/* ==========================================================================\n"+
                " * <%= pkg.name %>\n"+
                " * version <%= pkg.version %>: "+grunt.template.today('yyyy.mm.dd')+"\n"+
                " * ==========================================================================\n"+
                " * Copyright Team Magicodes.NET\n"+
                " * Licensed under MIT\n"+
                " * ========================================================================== */\n\n\n\n\n",
        stripBanners: false,
        separator: "\n\n\n\n",
      },
      js: {
        src: [
          "dev/js/magicodes-blog.js"
        ],
        dest: "dist/js/<%= pkg.project %>.js"
      },
      css: {
        src: [
          "dev/css/resorted-magicodes-blog.css"
        ],
        dest: "dist/css/<%= pkg.project %>.css"
      }
    },
    copy: {
      fonts: {
        expand: true,
        src: "dev/fonts/**",
        dest: "dist/fonts/",
        flatten: true,
        filter: 'isFile',
      },
      img: {
        expand: true,
        src: "dev/img/**",
        dest: "dist/img/",
        flatten: true,
        filter: 'isFile',
      },
      theme: {
        expand: true,
        src: "dev/theme/**",
        dest: "dist/theme/",
        flatten: true,
        filter: 'isFile',
      },
      css: {
        expand: true,
        src: ["dev/css/bootstrap.min.css", "dev/css/font-awesome.min.css"],
        dest: "dist/css/",
        flatten: true,
      },
      js: {
        expand: true,
        src: ["dev/js/bootstrap.min.js", "dev/js/jquery*.js"],
        dest: "dist/js/",
        flatten: true,
      },
      html: {
        expand: true,
        src: ["dev/*.html", "!dev/template.html"],
        dest: "dist/",
        flatten: true,
      }
    },
    validation: {
      options: {
        charset: "utf-8",
        doctype: "HTML5",
        failHard: true,
        reset: true,
        relaxerror: [
          'Element img is missing required attribute src.',
          'Attribute autocomplete not allowed on element input at this point.',
          'Attribute autocomplete not allowed on element button at this point.'
        ]
      },
      files: {
        src: "dev/*.html"
      }
    }

  });
  
  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask("default", ["clean", "csscomb", "concat", "copy", "clean:resorted"]);

};