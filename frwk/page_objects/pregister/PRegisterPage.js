'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;

  var RegisterPage = function () {
//    browser.get(conf.BASE_URL + '/register');

  };



  RegisterPage.prototype = Object.create({}, {

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

    firstNameField: {
      get: function () {
        return element(by.id('firstname'));
      }
    },

    lastNameField: {
      get: function () {
        return element(by.id('lastname'));
      }
    },

    companyField: {
      get: function () {
        return element(by.id('company'));
      }
    },


    emailFiled: {
      get: function () {
        return element(by.id('email'));
      }
    },

    phoneFiled: {
      get: function () {
        return element(by.id('phone'));
      }
    },
    registerButton: {
      get: function () {
        return element(by.id('register'));
      }
    },



    termAndContidtions: {
      get: function () {
        return element(by.id('termAndContidtions'));
      }
    },

    enterFN: { value: function (firstName) { return this.firstNameField.sendKeys(firstName);              }  },
    enterLN: { value: function (lastName) { return this.lastNameField.sendKeys(lastName);              }  },
    enterCompany: { value: function (cmpName) { return this.companyField.sendKeys(cmpName);              }  },
    enterPhone: { value: function (phNumber) { return this.phoneFiled.sendKeys(phNumber);              }  },
    enterEmail: { value: function (email) { return this.emailFiled.sendKeys(email);              }  },





    cloudfooterImage: {
      get: function () {
        return element(by.css('.cloud-footer footer'));
      }
    },

    loadingBanner: {
      get: function () { return element(by.xpath("//span[@translate='prd_REGISTER.LOADING_REGISTER']")) }
    },

    signUpSuccessMsg: {
      get: function () {  return element(by.xpath("//span[@translate='prd_REGISTER.SIGNUP_SUCCESS']"))  }
    },


    errorExplanation: {
      get: function () {  return element(by.css(".prd-register-error-explanation"))  }
    },



    checkULA: {
      get: function() { this.termAndContidtions.click(); }

    },

    clickCreateAccountButton: { get:  function() { this.registerButton.click();  }},


    registerFlow: {
      value:  function(fn, ln, cn, ph, email) {
        this.enterFN(fn);
        this.enterLN(ln);
        this.enterCompany(cn);
        this.enterPhone(ph);
        this.enterEmail(email);
        this.checkULA;
        this.clickCreateAccountButton;
      }
    },

    createAtmosAcctFlow: {
      get: function() {
        this.enterCompany("");
        this.enterPhone("222777222");
        this.checkULA;
        this.clickCreateAccountButton;
        browser.driver.sleep(20000);
      }
    }



  });


  module.exports = RegisterPage;
})();