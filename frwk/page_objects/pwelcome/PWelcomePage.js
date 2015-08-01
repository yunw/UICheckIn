'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;
  var IndexPage = require('../prd.index/prdIndexPage.js');

  var WelcomePage = function () {
//    browser.get(conf.BASE_URL + '/welcome');
  };



  WelcomePage.prototype = Object.create({}, {

    welcomeLogo: {
      get: function () {
        return element(by.css('.prd-welcome--logo'));
      }
    },

    welcomeUsername: {
      get: function () {
        return element(by.css('.prd-welcome-username'));
      }
    },
 
    welcomeDropdownLink: {
      get: function () {
        return element(by.css('.prd-welcome-popover-link'));
      }
    },

    welcomeDropdown: {
      get: function () {
        return element(by.css('.fa-caret-down'));
      }
    },

    welcomeDropdownContainer: {
      get: function () {
        return element(by.css('.prd-welcome-dropdown'));
      }
    },
    
    welcomeErrorMessage: {
      get: function () {
        return element(by.css('.prd-welcome-error-explanation'));
      }
    },

    welcomeLogoutButton: {
      get: function () {
        return element(by.id('logout'));
      }
    },

    welcomeProfileButton: {
      get: function () {
        return element(by.id('profile'));
      }
    },


    ClickWelcomeDropdownLink: {
      get: function()  {
        this.welcomeDropdownLink.click();
      }
    },

    ClickWelcomeProfileButton: {
      get: function()  {
        this.welcomeProfileButton.click();
        //return new UpdatePage();
      }
    },

    ClickWelcomeLogoutButton: {
      get: function()  {
        this.ClickWelcomeDropdownLink;
        browser.driver.sleep(200);
        this.welcomeLogoutButton.click();

//        return new IndexPage();
      }
    }


  });


  module.exports = WelcomePage;
})();