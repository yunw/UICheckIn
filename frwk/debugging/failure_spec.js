/**
 * Created by yunwang on 7/8/15.
 */

var webdriver = require('selenium-webdriver');


describe('modes of failure', function() {
  it('should fail to find a non-existent element', function() {
    browser.get('index.html#/form');

    // Run this statement before the line which fails. If protractor is run
    // with the debugger (protractor debug debugging/conf.js), the test
    // will pause after loading the webpage but before trying to find the
    // element.
    browser.debugger();

    // This element doesn't exist, so this fails.
    var nonExistant = element(by.binding('nopenopenope')).getText();
  });

  it('should fail to click a hidden element', function() {
    element(by.id('hiddenbutton')).click();
  });

});
