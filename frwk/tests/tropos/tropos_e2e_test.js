'use strict';

var SharedElements = require('../../page_objects/prd_shared/Elements.js');
var IndexPage = require('../../page_objects/prd.index/prdIndexPage.js');
var TAPage = require('../../page_objects/prd.TA/AccountPage.js');
var WelcomePage = require('../../page_objects/prd.welcome/prdWelcomePage.js');
var RegisterPage = require('../../page_objects/prd.register/prdRegisterPage.js');
var DocsMainPage = require('../../page_objects/prd.docs/prdDocsMainPage.js');
var CLib = require('../../utility/common.js');
var conf = require('../../config/serverConf.js').serverConfig;

describe('prd MVP4 End2End Test', function() {

  var indexPage = new IndexPage();
  var welcomePage = new WelcomePage();
  var registerPage = new RegisterPage();
  var docsMainPage = new DocsMainPage();


  var sharedElements = new SharedElements();
  var clib = new CLib();


  beforeEach(function(){
    browser.get(conf.BASE_URL + '/');
  });

  afterEach(function() {
    browser.driver.manage().deleteAllCookies();
//    welcomePage.ClickWelcomeLogoutButton;
  });

  it('P_MVP4_1 Should be able to go to docs link', function() {
    browser.driver.get(conf.BASE_URL + '/docs/index.html');
    //    TODO: Need to be fix, need login first
    expect(docsMainPage.getStartedElement.isDisplayed()).toBe(true);
  });

  it('P_MVP4_2 Should have login screen', function() {
    expect(indexPage.email.isPresent()).toBe(false);
    expect(indexPage.loginButton.isPresent()).toBe(true);
    expect(indexPage.signUpButton.isPresent()).toBe(true);
    expect(sharedElements.Logo.isPresent()).toBe(true);
    expect(sharedElements.Logo.isPresent()).toBe(true);
    expect(sharedElements.rocketLogo.isPresent()).toBe(true);
  });


  it('P_MVP4_3 Should show welcome page after login', function() {
//    TODO need revert below line once logout cookie issue fixed
//    indexPage.ClickLoginButtonAndTASignin;
    indexPage.ClickLoginButton;
    var firstwelcome = /^(http?:\/\/)(\w+|(\d+.\d+.\d+.\d+)):\d+\/welcome/;
    clib.waitCurrentURL(firstwelcome);
    expect(browser.driver.getCurrentUrl()).toContain('welcome');
    expect(welcomePage.welcomeLogo.isDisplayed()).toBe(true);
    expect(welcomePage.welcomeUsername.isPresent()).toBe(true);
    welcomePage.ClickWelcomeLogoutButton;
    clib.clearTACookies;
  });

  it('P_MVP4_4 Should show correct fields after signup', function() {
    indexPage.ClickSignupButton;
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

  it('P_MVP4_5 Should show dropdown element in welcome page - MVP6', function() {
//    TODO: bug: logout doesn’t always work. it has some session period
//    clib.clearTACookies;
//    below step should be used once the above defect fixed
//    indexPage.ClickLoginButtonAndTASignin;

    indexPage.ClickLoginButton;
    expect(welcomePage.welcomeLogo.isDisplayed()).toBe(true);
    expect(welcomePage.welcomeUsername.isPresent()).toBe(true);
    expect(welcomePage.welcomeDropdownLink.isDisplayed()).toBe(true);
    expect(welcomePage.welcomeDropdown.isPresent()).toBe(true);
    expect(welcomePage.welcomeDropdownContainer.isPresent()).toBe(false);
    expect(welcomePage.welcomeErrorMessage.isDisplayed()).toBe(false);

  });

});
