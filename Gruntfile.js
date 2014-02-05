module.exports = function(grunt) {

  // Configuration.
  grunt.initConfig({
    jshint: {
      options: {
        "undef": true,
        "unused": true
      },

      files: ["jquery.hotkeys.js"]
    },
    jasmine: {
      pivotal: {
        src: 'test/lib/**.js',
        options: {
          vendor: 'jquery-1.4.2.js',
          specs: 'test/spec/*Spec.js'
        }
      }
    }
  });

  // Task loading.
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // tests
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Task registration.
  grunt.registerTask("default", ["jshint", "jasmine"]);

};
