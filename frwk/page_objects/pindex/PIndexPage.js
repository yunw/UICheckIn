/**
 * Created by yunwang on 7/06/15.
 */

'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;

//  var EC = protractor.ExpectedConditions;


  var DocHomePage = require('../../page_objects/prd.docs/prdDocsMainPage.js');
  var TAPage = require('../../page_objects/prd.TA/AccountPage.js');
  var CLib = require('../../utility/common.js');
  var taPage = new TAPage();
  var clib = new CLib();

  var ta_url = /^(https:\/\/)\w+-\w+..com\/\w+\/sso\/idp\/\w+-\w+-\w+.ep\?resume=\/idp\/\w+\/resumeSAML\d+\/idp\/SSO.ping&spentity=_\w+#/;
  var create_url = /^http:\/\/[a-z0-9]*.[a-z0-9]*.[a-z0-9]*.[a-z0-9]*\/register\?fn=[^&]*&ln=[^&]*&eid=[^&]*&ru=[^&]*&uid=[^&]*$/;


  var indexPage = function () {
//    browser.get(conf.BASE_URL + '/');
  };

  indexPage.prototype = Object.create({}, {


    loginButton: {
      get: function () {
        return element(by.id('login'));
      }
    },
    email: {
      get: function () {
        return element(by.id('email'));
      }
    },
    password: {
      get: function () {
        return element(by.id('password'));
      }
    },

    helpLink: {
      get: function () {
        return element(by.xpath("//span[@translate='prd_INDEX.HELP_CENTER']"));
      }
    },

    signUpButton: {
      get: function() {
        return element(by.id('signup'));
      }
    },

    ClickLoginButton: {
      get: function () {
        this.loginButton.click();
        browser.driver.sleep(1200);
        clib.waitCurrentURL(ta_url);
      }
    },

    ClickLoginButtonTANotActivated: {
      get: function () {
        this.loginButton.click();
        browser.driver.sleep(1200);
        clib.waitCurrentURL(ta_url);
        taPage.sendUserName("tqa222@mailinator.com");
        taPage.sendPassword("1234qwer");
        taPage.ClickSigninButton;
//        browser.driver.sleep(200);
      }
    },

    ClickLoginButtonAndFirstTimeTAActivatedOnly: {
      get: function () {
        this.loginButton.click();
        browser.driver.sleep(1200);
        clib.waitCurrentURL(ta_url);
//        TODO need ta user
        taPage.LoginInTA("prdmvp6@yahoo.com", "prdphere");


      }
    },

    ClickLoginButtonAndTASignin: {
      get: function () {
        this.loginButton.click();
        browser.driver.sleep(200);
        clib.waitCurrentURL(ta_url);
        taPage.sendUserName(conf.userName);
        taPage.sendPassword(conf.userPasswd);
        taPage.ClickSigninButton;
        browser.driver.sleep(1200);
        clib.waitCurrentURL(conf.BASE_URL + '/welcome');

//        return new WelcomePage();
      }
    },


    ClickSignupButton: {
      get: function () {
        browser.driver.sleep(200);
        clib.waitElementByID('signup');
        this.signUpButton.click();
        browser.driver.sleep(200);
        clib.waitCurrentURL(conf.BASE_URL + '/register');
//        return new RegistrationPage();

      }
    },

    ClickHelpLink: {
      get: function()  {
        this.helpLink.click();
        return new DocHomePage();
      }
    }

//    firstTimeLogin: {


//      indexPage.ClickLoginButton;
//  clib.waitCurrentURL(ta_url);
//  expect(browser.driver.getCurrentUrl()).toMatch(ta_url);
//
//  taPage.sendUserName('prdmvp6@yahoo.com');
//  taPage.sendPassword('prdphere');
//  taPage.ClickSigninButton;
//    }


  });

  module.exports = indexPage;
})();