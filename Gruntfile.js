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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['sass', 'nodemon']);
};