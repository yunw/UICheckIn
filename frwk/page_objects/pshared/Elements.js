/**
 * Created by yunwang on 7/07/15.
 */

'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;

  var LogoObj = function () {

  };



  LogoObj.prototype = Object.create({}, {

    welcomeLogo: {
      get: function () {
        return element(by.css('.prd-welcome--logo'));
      }
    },

    Logo: {
      get: function () {
        return element(by.css(".branding--logo"));
      }
    },

    Logo: {
      get: function () {
        return element(by.css(".branding--logo"));
      }
    },

    rocketLogo: {
      get: function () {
        return element(by.css(".branding-rocket-logo"));
      }
    },


    termAndContidtions: {
      get: function () {
        return element(by.id('termAndContidtions'));
      }
    },



    cloudfooterImage: {
      get: function () {
        return element(by.css('.cloud-footer footer'));
      }
    }



  });


  module.exports = LogoObj;
})();