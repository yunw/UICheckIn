var serverConfig = require('./serverConf.js').serverConfig;


var suites = {
//  e2e   : '../tests/prd/prd_e2e_test.js',
  e2e_perf   : '../tests/prd/prd_e2e_perf_test.js',
//  prd_example  :  '../tests/prd_example/prd_exmaple_e2e_test.js'
};


var baseUrl;
if ( process.env.SERVER_HOSTNAME ) {
  baseUrl = "http://" + process.env.SERVER_HOSTNAME;
} else {
  baseUrl = serverConfig.BASE_URL;
}


var capabilities = {
  'browserName': 'chrome'
};
if ( process.env.BROWSER === "firefox") {
  capabilities = {
    "browserName": "firefox",
    "firefox_binary": "/Applications/Firefox34.app/Contents/MacOS/firefox-bin",
    "binary_": "/Applications/Firefox34.app/Contents/MacOS/firefox-bin"
  };
}

var screen = [1280, 800];
if ( process.env.DISPLAY_SIZE ) {
  var arr = process.env.DISPLAY_SIZE.split("x");
  screen = [Number(arr[0]), Number(arr[1])];
  console.log("DISPLAY width X height: " + screen.join(" X "));
}
console.log("Browser:" + capabilities.browserName + ", Base URL: " + baseUrl);


exports.config = {
    selenium: 'http://localhost:4444/wd/hub',
    seleniumPort: 4444,
  baseUrl: baseUrl,
  params: {
    screen: {
      width: screen[0],
      height: screen[1]
    },

    screenshotPath: "./report",

    login: {
      username: 'dan@acme.com',
      password: 'apollo'
    }
  },
  allScriptsTimeout: 150000,
  capabilities: capabilities,

  suites: suites,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 3600000
  },

  framework: "jasmine2",
  onPrepare: '../utility/preparation.js'
};
