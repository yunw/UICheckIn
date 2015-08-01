/**
 * Created by yunwang on 7/07/15.
 */

'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;

  var ExamplePage = function () {
    browser.get(conf.BASE_URL + '/example');
  };



  ExamplePage.prototype = Object.create({}, {

    exampleHeader: {
      get: function () {  return element(by.css('body > div > h2'));  }
    },

    ExampleLeftButton: {
      get: function () { return element.all(by.css("button")).first();  }
    },

    ClickLeftButton: {
      get: function () {
        this.ExampleLeftButton.click();
        return element(by.css(".btn-group")).getText();
      }
    }


  });


  module.exports = ExamplePage;
})();