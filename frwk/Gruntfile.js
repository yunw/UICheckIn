module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      options: {
        stdout: true
      },
      selenium: {
        command: './selenium/start',
        options: {
          stdout: false,
          async: true
        }
      },
      protractor_install: {
        command: 'node ./node_modules/protractor/bin/webdriver-manager update'
      },
      npm_install: {
        command: 'npm install'
      }
    },

    protractor: {
      options: {
        keepAlive: false,
        configFile: "./config/protractorConf.js"
      },
      singlerun: {
      },

      prde2e:  {
        options: {
          args: {
            specs: ['tests/prd/prd_e2e_test.js']
          }
        }
      },

      debug:  {
        options: {
          args: {
            specs: ['tests/prd/prd_mvp6_login_test.js']
//            specs: ['tests/prd_example/prd_exmaple_e2e_test.js']
          }
        }
      },

      prdexmaple_perf:  {
        options: {
          args: {
            specs: ['tests/prd_example/prd_exmaple_e2e_perf_test.js']
          }
        }
      },


      auto: {
        keepAlive: true,
        options: {
          args: {
            seleniumPort: 4444
          }
        }
      }
    }

  });

    grunt.registerTask('update', ['shell:npm_install']);
    grunt.registerTask('install', ['update','shell:protractor_install']);

    grunt.registerTask('default', ['protractor:singlerun']);

    grunt.registerTask('test:e2e', ['protractor:prde2e']);
    grunt.registerTask('test:debug', ['protractor:debug']);
    grunt.registerTask('test:prd_example', ['protractor:prdexmaple']);
    grunt.registerTask('test:prd_example_perf_test', ['protractor:prdexmaple_perf']);
    grunt.registerTask('test:global', ['protractor:prde2e', 'protractor:prdexmaple']);


//  TODO
//  var protractorperf = require('protractor-perf');
//  grunt.registerTask('protractorperf', function() {
//    var donerun = this.async();
//    protractorperf.run('./config/protractorConf_perf.js',donerun); // config file
//  });
//  grunt.registerTask('run', ['protractorperf']);


};