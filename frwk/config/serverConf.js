
var serverConfig = {}

//Running in local environment
//serverConfig.BASE_URL = 'http://localhost:3000';

// Running in local docker container
//serverConfig.BASE_URL = 'http://192.168.59.103:3000';


//Running in Vagrant VM
serverConfig.BASE_URL = 'http://10.245.1.2';

//Running in UAT docker
//serverConfig.BASE_URL = 'http://10.114.94.25:3000';

//true/false
serverConfig.takeScreenshots = true;

serverConfig.specs = [
  '../tests/prd/prd_e2e_test.js',
  '../tests/prd/prd_mvp6_login_test.js',
  '../tests/prd_example/prd_exmaple_e2e_test.js'
];

//chrome, firefox, safari, ie(TODO)
//serverConfig.browsers = ['chrome', 'firefox']
serverConfig.browserName = 'chrome',
serverConfig.userName = 'prdqa111@mailinator.com',
serverConfig.userPasswd = '12345678',

exports.serverConfig = serverConfig;

