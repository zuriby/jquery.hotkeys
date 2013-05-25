module.exports = function(grunt) {

  // Configuration.
  grunt.initConfig({
    jshint: {
      options: {
        "undef": true,
        "unused": true
      },

      files: ["jquery.hotkeys.js"]
    }
  });

  // Task loading.
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // Task registration.
  grunt.registerTask("default", ["jshint"]);

};
