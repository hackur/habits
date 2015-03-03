module.exports = function(grunt) {
  grunt.initConfig({
    clean: ['typecheck'],

    shell: {
      startFlow: {
        command: 'flow start'
      },

      flow: {
        command: 'flow'
      }
    },

    watch: {
      flow: {
        files: ['app/**/*.js'],
        tasks: ['newer:babel:flow', 'shell:flow']
      }
    },

    babel: {
      flow: {
        options: {
          blacklist: ['flow']
        },

        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['**/*.js'],
            dest: 'typecheck'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('startFlow', ['clean', 'babel:flow', 'shell:startFlow', 'shell:flow']);
  grunt.registerTask('flow', ['watch:flow']);
}
