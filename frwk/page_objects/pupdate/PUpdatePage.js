'use strict';

(function () {
  var conf = require('../../config/serverConf.js').serverConfig;

  var UpdatePage = function () {
    browser.get(conf.BASE_URL + '/update');
  };

  UpdatePage.prototype = Object.create({}, {


    updateSuccessMessage: {
      get: function () {
        return element(by.css(".prd-update-success"));
      }
    },

    updateErrorMessage: {
      get: function () {
        return element(by.css(".prd-update-error-explanation"));
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


    emailField: {
      get: function () {
        return element(by.id('email'));
      }
    },

    phoneField: {
      get: function () {
        return element(by.id('phone'));
      }
    },
    saveButton: {
      get: function () {
        return element(by.id('save'));
      }
    },
    editButton: {
      get: function () {
        return element(by.id('edit'));
      }
    },

    cancelButton: {
      get: function () {
        return element(by.id('cancel'));
      }
    },

    clickSaveButton: {
      get: function () {
        this.saveButton.click();
      }
    },
    clickEditButton: {
      get: function () {
        this.editButton.click();
      }
    },

    clickCancelButton: {
      get: function () {
        this.cancelButton.click();
      }
    }

  });


  module.exports = UpdatePage;
})();