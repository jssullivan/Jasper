module.exports = function(grunt) {
  grunt.initConfig({
    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded'
        },
        files: {                         
          'public/style/main.css': 'sass/main.scss',  
          'public/style/login.css': 'sass/login.scss'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    shell: {
      mongodb: {
        command: "mongod --dbpath=db",
        options: {
          async: true,
          stdout: false,
          stderr: true,
          failOnError: false,
          execOptions: {
            cwd: "."
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['sass', 'shell:mongodb', 'nodemon']);
};