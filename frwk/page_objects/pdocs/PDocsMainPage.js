
/**
 * Created by yunwang on 6/18/15.
 * doc page is a non angular page.
 */


'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;


  var DocsMainPage = function () {
//    browser.driver.get(conf.BASE_URL + '/docs/index.html');
  };


  DocsMainPage.prototype = Object.create({}, {

    getStartedElement: {
      get: function () {
        return browser.driver.findElement(by.xpath("//a[contains(., 'Started')]"));
      }
    }
  });


  module.exports = DocsMainPage;
})();

