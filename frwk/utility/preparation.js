/**
 * Desc: This file is used for the preparation before the spec files executed and report format.
 */
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var protConf = require('../config/protractorConf.js').config;
var runConf = require('../config/serverConf.js').serverConfig;

require('jasmine-bail-fast');


var today = new Date(),
    timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';

var path = require('path');
var functionalResults = {"passed": [],"failed": []};


var capabilities = protConf.capabilities;

//TODO: path builder doesn't work'
var pathBuilder = function(spec, suites, descriptions){
  return path.join(spec.getFullName(), capabilities.caps_.browserName, descriptions.join('-'));
//  return path.join(spec.suite.getFullName(), capabilities.caps_.browserName, descriptions.join('-'));
};

function defaultMetaDataBuilder(spec, descriptions, results, capabilities) {
  var metaData = {
    description: descriptions.join(' ')
    , passed: results.passed()
    , os: capabilities.caps_.platform
    , browser: {
      name: capabilities.caps_.browserName
      , version: capabilities.caps_.version
    }
  };

  if(results.items_.length > 0) {
    var result = results.items_[0];
    metaData.message = result.message;
    metaData.trace = result.trace.stack;
  }//end if

  if(metaData.passed){
    functionalResults.passed.push(metaData);
    metaData.message = 'Passed!'
  }else{
    functionalResults.failed.push(metaData);
    metaData.message = 'Failed!'
  }//end if
  return metaData;
}



//protractor-html-screenshot-reporter is not compale with jasmine 2

var htmlReporter_deprecated = new Jasmine2HtmlReporter({
    savePath: browser.params.screenshotPath + '/' + 'htmlReport/', // a location to store screen shots.
    screenshotsFolder: 'images',
    takeScreenshots: true,
    docTitle: 'End to End Test Reporter',
    filePrefix: 'end2endHTMLTestReport',
    takeScreenShotsForSkippedSpecs: true,
    preserveDirectory: true,
    pathBuilder: pathBuilder,
    metaDataBuilder: defaultMetaDataBuilder
});



var Jasmine2HtmlReporter = require('protractor-html-screenshot-reporter');
var htmlReporter = new Jasmine2HtmlReporter({
  baseDirectory: browser.params.screenshotPath + '/' + 'htmlReport/', // a location to store screen shots.
  screenshotsFolder: 'images',
  takeScreenshots: true,
  docTitle: 'End to End Test Reporter',
  filePrefix: 'end2endHTMLTestReport',
  takeScreenShotsForSkippedSpecs: true,
  preserveDirectory: true
//  TODO: to be fixed for customize the pathBuilder and metaDataBuilder
//  pathBuilder: function(spec, suites, descriptions){
//    return path.join(spec.getFullName, capabilities.caps_.browserName, descriptions.join('-'));
//  },
//  pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
//    return path.join(capabilities.caps_.browser, descriptions.join('-'));
//    return path.join(spec.caps_.description, capabilities.caps_.browser, descriptions.join('-'));
//  },
//  metaDataBuilder: defaultMetaDataBuilder
});


var fs = require('fs')

var deleteFolderRecursive = function (path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


//deleteFolderRecursive(__dirname + '../report');

browser.driver.manage().window().setSize(browser.params.screen.width, browser.params.screen.height);


var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
  savePath: browser.params.screenshotPath,
  consolidateAll: false
});

var SpecReporter = require('jasmine-spec-reporter');
jasmine.getEnv().addReporter(new SpecReporter({
  displaySpecDuration: true,
  displayStacktrace: true
}));

var takeScrnsht = runConf.takeScreenshots;
//TODO: alternative solution by "protractor-html-screenshot-reporter": "mping/protractor-html-screenshot-reporter",
var screenshotTaken = function (takeScrnsht) {
   if (takeScrnsht) {
     jasmine.getEnv().addReporter(htmlReporter);
   }else{
     console.log("Screenshots report will be ignored.")
   }
}

jasmine.getEnv().addReporter(junitReporter);
screenshotTaken(takeScrnsht);

//jasmine.getEnv().bailFast();

/**
 * prepare for log in before execute the test cases.
 * @type {LoginPage}
 */


var IndexPage = require('../page_objects/prd.index/prdIndexPage.js');
var RegPage = require('../page_objects/prd.register/prdRegisterPage.js');
var indexPage = new IndexPage();
var regPage = new RegPage();

var redirectFirstLogin = function(){

  browser.driver.get(runConf.BASE_URL + '/');
  indexPage.ClickLoginButton;
  browser.driver.sleep(200);
  browser.driver.findElement(by.id('j_username')).sendKeys(runConf.userName);
  browser.driver.findElement(by.id('j_password')).sendKeys(runConf.userPasswd);
  browser.driver.findElement(by.id('signIn')).click();

  return browser.driver.wait(function() {
    return browser.driver.getCurrentUrl().then(function(url) {
      //welcomePage.ClickWelcomeLogoutButton;
      browser.driver.manage().deleteAllCookies();
      if(url.indexOf('/register') < 0){//if user exists both TA and atmos, then go to TA login
        console.log( url);
        console.log("already a atom user");
        return runConf.BASE_URL;
      }else{ //when it's first time login/only exists in TA then go to create account
        console.log("not in atmos");
        regPage.createAtmosAcctFlow;
        browser.driver.sleep(200);
        return runConf.BASE_URL;
      }
    });
  }, 10000);
};

redirectFirstLogin();

