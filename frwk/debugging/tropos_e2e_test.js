'use strict';
var webdriver = require('selenium-webdriver');

var SharedElements = require('../page_objects/prd_shared/Elements.js');
var LoginPage = require('../page_objects/prd_login/prdLoginPage.js');
var WelcomePage = require('../page_objects/prd.welcome/prdWelcomePage.js');
var RegisterPage = require('../page_objects/prd.register/prdRegisterPage.js');
var DocsMainPage = require('../page_objects/prd.docs/prdDocsMainPage.js');
var CLib = require('../utility/common.js');

describe('prd End2End Test', function() {

  var loginPage;
  var welcomePage;


  var sharedElements = new SharedElements();
  var clib = new CLib();

  beforeEach(function(){
    loginPage = new LoginPage();
  });


  it('P_10_WS_6-1 Should have login screen', function() {

    browser.debugger();
    expect(loginPage.email.isPresent()).toBe(false);
    expect(loginPage.signUpButton.isPresent()).toBe(true);
    expect(sharedElements.Logo.isPresent()).toBe(true);
    expect(sharedElements.Logo.isPresent()).toBe(true);
    expect(sharedElements.rocketLogo.isPresent()).toBe(true);
  });

//  TODO: this case will not be able to run because after login will not be welcome page without signup first

  it('P_10_WS_6-2 Should show welcome page after login', function() {
    loginPage.loginButton.click();
    clib.waitCurrentURL();
    expect(browser.getLocationAbsUrl()).toContain('welcome');
    welcomePage = new WelcomePage();
    expect(welcomePage.welcomeLogo.isDisplayed()).toBe(true);
  });

  it('P_10_WS_6-3 Should show welcome page after signup', function() {
    loginPage.ClickSignupButton;
    var registerPage = new RegisterPage();
    expect(registerPage.Logo.isDisplayed()).toBe(true);
    expect(registerPage.Logo.isDisplayed()).toBe(true);
    expect(registerPage.rocketLogo.isDisplayed()).toBe(true);
    expect(registerPage.firstNameField.isPresent()).toBe(true);
    expect(registerPage.lastNameField.isPresent()).toBe(true);
    expect(registerPage.companyField.isPresent()).toBe(true);
    expect(registerPage.phoneFiled.isPresent()).toBe(true);
    expect(registerPage.emailFiled.isPresent()).toBe(true);
    expect(registerPage.termAndContidtions.isPresent()).toBe(true);
    expect(registerPage.registerButton.isPresent()).toBe(true);
    expect(registerPage.cloudfooterImage.isDisplayed()).toBe(true);
  });


  it('P_10_WS_1 Should be able to go to docs link', function() {
    loginPage.ClickHelpLink;
    expect(clib.waitCurrentURL()).toContain('/docs');
    var docsMainPage = new DocsMainPage();
    expect(docsMainPage.getStartedElement.isDisplayed()).toBe(true);
  });


});
