var serverConfig = require('./serverConf.js').serverConfig;

var suites = serverConfig.testsuites;
var specs = serverConfig.specs;



var baseUrl;
if ( process.env.SERVER_HOSTNAME ) {
  baseUrl = "http://" + process.env.SERVER_HOSTNAME;
} else {
  baseUrl = serverConfig.BASE_URL;
}

var browserName;
  if ( process.env.BROWSER === "firefox" ) {
    browserName = 'firefox'
  }
  else {
    browserName = 'chrome'
  }


var capabilities = {
  'browserName': serverConfig.browserName
//  'browserName': 'chrome'
//  TODO: existing bug with incognito https://github.com/angular/protractor/issues/2045
//  'chromeOptions': { 'args': ['incognito'] }


};




//if ( process.env.BROWSER === "firefox") {
//  capabilities = {
//    "browserName": "firefox",
////    "firefox_binary": "/Applications/Firefox34.app/Contents/MacOS/firefox-bin",
//    "firefox_binary": "/Applications/Firefox.app/Contents/MacOS/firefox-bin",
//    "binary_": "/Applications/Firefox.app/Contents/MacOS/firefox-bin"
//  };
//}

var screen = [1280, 800];
if ( process.env.DISPLAY_SIZE ) {
  var arr = process.env.DISPLAY_SIZE.split("x");
  screen = [Number(arr[0]), Number(arr[1])];
  console.log("DISPLAY width X height: " + screen.join(" X "));
}

console.log("Browser: " + serverConfig.browserName + ", Base URL: " + baseUrl);


exports.config = {
//  seleniumServerJar: "../libs/selenium-server-standalone-2.46.0.jar",
  seleniumServerJar: "../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar",
  seleniumPort: 4444,
  baseUrl: baseUrl,
  params: {
    screen: {
      width: screen[0],
      height: screen[1]
    },

    screenshotPath: "./report/" + serverConfig.browserName

//    login: {
//      username: 'dan@acme.com',
//      password: 'apollo'
//    }
  },
  allScriptsTimeout: 150000,
  capabilities: capabilities,

//  multiCapabilities: [{
//    'browserName': 'firefox'
//  }, {
//    'browserName': 'chrome'
//  }],

//  suites: suites,
  specs: specs,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 3600000
  },

  framework: "jasmine2",
  onPrepare: '../utility/preparation.js'
};
