module.exports = function(grunt) {

  // Configuration.
  grunt.initConfig({
    // verifies we have formatted our js and HTML according to our style conventions
    jsbeautifier: {
      files: ['Gruntfile.js', 'jquery.hotkeys.js', 'test/spec/**/*.js'],
      options: {
        mode: 'VERIFY_ONLY',
        js: {
          'indent_size': 2,
          'indent_char': ' ',
          'indent_level': 0,
          'indent_with_tabs': false,
          'preserve_newlines': true,
          'max_preserve_newlines': 2,
          'jslint_happy': false,
          'brace_style': 'end-expand',
          'indent_scripts ': 'keep',
          'keep_array_indentation': true,
          'keep_function_indentation': false,
          'space_before_conditional': true,
          'break_chained_methods': false,
          'eval_code': false,
          'unescape_strings': false,
          'wrap_line_length': 0
        }
      }
    },
    jshint: {
      options: {
        "undef": true,
        "unused": true
      },
      files: 'jquery.hotkeys.js'
    },
    jasmine: {
      pivotal: {
        options: {
          vendor: ['jquery-1.4.2.js', 'jquery.hotkeys.js', 'test/lib/**.js'],
          outfile: 'test/SpecRunner.html',
          keepRunner: true,
          specs: 'test/spec/*Spec.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
          interrupt: true,
          debounceDelay: 1000
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  // Beautify javascript
  grunt.loadNpmTasks("grunt-jsbeautifier");

  // Task loading
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // Running tests
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Task registration.
  grunt.registerTask("default", ["jsbeautifier", "jshint", "jasmine"]);
};
