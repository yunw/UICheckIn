/**
 * This file is used for shared functions to be used in all test cases.
 */

var EC = protractor.ExpectedConditions;

var conf = require('../config/serverConf.js').serverConfig
var userName = conf.userName;


var waitCurrentURL = function (urlRegexp, log) {
  return browser.driver.wait(function () {
    return browser.driver.getCurrentUrl().then(function (url) {
      if (log) {
        console.log('waiting for url====', url)
      }
      return url;
    });
  });
};

var waitElementByID = function (name) {
  return browser.driver.wait(function () {
      return  browser.findElement(by.id(name));
    })
};

var waitElementByCSS = function (className, log) {
  return browser.driver.wait(function () {
    return browser.findElements(by.css(className))
      .then(function (element) {
        if (log) {
          console.log('waiting for className :', className, '...', element.length)
        }
        return  element.length > 0;
      });
  }).then(function () {
      return  browser.findElement(by.css(className));
    })
};

/**
 * @name waitForUrlToChangeTo
 * @description Wait until the URL changes to match a provided regex
 * @param {RegExp} urlRegex wait until the URL changes to match this regex
 * @returns {!webdriver.promise.Promise} Promise
 */
function waitForUrlToChangeTo(urlRegex) {
  var currentUrl;

  return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
      currentUrl = url;
    }
  ).then(function waitForUrlToChangeTo() {
      return browser.wait(function waitForUrlToChangeTo() {
        return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
          return urlRegex.test(url);
        });
      });
    }
  );
}

function clearTACookies() {
  browser.get("https://accounts-awsqa..com/storefront/index.ep");
  browser.driver.sleep(200);
  browser.driver.manage().deleteAllCookies();
}




var globalCommons = function() {
  return {
    waitCurrentURL: waitCurrentURL,
    waitElementByCSS: waitElementByCSS,
    waitElementByID: waitElementByID,
    waitForUrlToChangeTo: waitForUrlToChangeTo,
    clearTACookies: clearTACookies
  }
}







module.exports = globalCommons;
