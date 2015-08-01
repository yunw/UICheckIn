'use strict';

var IndexPage = require('../../page_objects/prd.index/prdIndexPage.js');
var RegPage = require('../../page_objects/prd.register/prdRegisterPage.js');
var WelcomePage = require('../../page_objects/prd.welcome/prdWelcomePage.js');
var BasePage = require('../../page_objects/basePage.js');
var TAPage = require('../../page_objects/prd.TA/AccountPage.js');

var conf = require('../../config/serverConf.js').serverConfig;

var tools = require('../../utility/tools.js')();
//TODO: need fix
var email = "tqa" + tools.getRandomInt(1, 100) + "@mailinator.com";
console.log("---testing email address: " + email + "----")


var EC = protractor.ExpectedConditions;



describe('prd MVP6 End2End Test', function() {

  var basePage = new BasePage();
  var indexPage = new IndexPage();
  var welcomePage = new WelcomePage();
  var registerPage = new RegPage();
  var taPage = new TAPage();


  beforeEach(function(){
    browser.get(conf.BASE_URL + '/');
//    browser.driver.manage().deleteAllCookies();
  });

  afterEach(function() {
    browser.driver.manage().deleteAllCookies();
  });

  it ('P_WS_MVP6_1 Should have the correct page title name', function() {
    expect(basePage.GetHeaderText).toEqual(' Cloud Central');
  });



  it('P_WS_MVP6_2 Should have profile button under dropdown menu in welcome page', function() {
//    TODO need enable once logout issue fixed
//    indexPage.ClickLoginButtonAndTASignin;
    indexPage.ClickLoginButton;
    welcomePage.ClickWelcomeDropdownLink;
    expect(welcomePage.welcomeDropdownContainer.isDisplayed()).toBe(true);
    expect(welcomePage.welcomeLogoutButton.isDisplayed()).toBe(true);
    expect(welcomePage.welcomeProfileButton.isDisplayed()).toBe(true);
    welcomePage.ClickWelcomeProfileButton;
    expect(browser.driver.getCurrentUrl()).toMatch(/\/update/);

  });




  it('P_WS_MVP6_3 Should have logout button under dropdown menu in welcome page', function() {
//    TODO need enable once logout issue fixed
//    indexPage.ClickLoginButtonAndTASignin;
    indexPage.ClickLoginButton;
    welcomePage.ClickWelcomeLogoutButton;
    expect(browser.driver.getCurrentUrl()).toMatch(conf.BASE_URL);
  });

  //    TODO: need fix the logout issue first
  xit('P_WS_MVP6_8 Should have error message in TA when the user is not TA account', function() {
    //    welcomePage.ClickWelcomeLogoutButton;
    indexPage.ClickLoginButtonTANotActivated;
    expect(taPage.errorMsgEvalSignIn.isDisplayed()).toBe(true);
  });

  //    TODO: need fix with an ta user but not a atmos account
  xit('P_WS_MVP6_6 Should go to Create an Account page when login with an TA but not atmos account', function() {
    indexPage.ClickLoginButtonAndFirstTimeTAActivatedOnly;
    browser.driver.sleep(200);
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
  });


//  TODO: need fix with an ta user but not a atmos account
  it('P_WS_MVP6_7 Should register the user as Atmos user when login with an existing TA account', function() {
    indexPage.ClickLoginButtonAndFirstTimeTAActivatedOnly;
    registerPage.enterCompany("");
    registerPage.enterPhone("6502220000");
    registerPage.checkULA;
    expect(registerPage.registerButton.isPresent()).toBe(true);

//    registerPage.clickCreateAccountButton;
//    expect(browser.driver.getCurrentUrl()).toMatch(/\/welcome/);

  });




  xit('P_WS_MVP6_4 Should logout and login even without delete cookies', function() {
//    TODO: to be fixed with logout
//    indexPage.ClickLoginButtonAndTASignin;
    indexPage.ClickSigninButton;
    welcomePage.ClickWelcomeDropdownLink;
    welcomePage.ClickWelcomeLogoutButton;
//    indexPage.ClickLoginButtonAndTASignin;
//    TODO add assertion

  });

  xit('P_WS_MVP6_5 Should phone field has format validation in register page', function() {
    indexPage.ClickSignupButton;
    registerPage.enterFN("a");
    registerPage.enterLN("b");
    registerPage.enterCompany("adfads");
    registerPage.enterEmail(email);
    registerPage.enterPhone('aabc');
    expect(browser.driver.getCurrentUrl()).toMatch(/\/register/);
//    TODO need assertion to check the tooltips

  });

  it('P_WS_MVP6_6 Should register a new account', function() {
    indexPage.ClickSignupButton;
    registerPage.registerFlow("Dan", "Fisher", "o", "1112222", email);
//    browser.driver.sleep(20);
//    TODO to be fixed
//    expect(registerPage.loadingBanner.isDisplayed()).toBe(true);
    browser.driver.sleep(2200);
    expect(browser.driver.getCurrentUrl()).toMatch(/\/register/);
    expect(registerPage.signUpSuccessMsg.isDisplayed()).toBe(true);
    //    TODO to be done
//    tools.emailActivateProcess;
//    TODO: dlete the email from mailinator.com



  });

  it('P_WS_MVP6_10 Should throw exception if email already registered once but not activated yet', function() {
    indexPage.ClickSignupButton;
    registerPage.registerFlow("Dan", "Fisher", "o", "1112222", "tqa40@mailinator.com");
    browser.driver.sleep(1200);
//    expect(registerPage.loadingBanner.isDisplayed()).toBe(true);
//    browser.driver.sleep(2200);
    expect(browser.driver.getCurrentUrl()).toMatch(/\/register/);
    expect(registerPage.errorExplanation.isDisplayed()).toBe(true);
//    expect(registerPage.signUpSuccessMsg.isDisplayed()).toBe(true);


//    indexPage.ClickSignupButton;
//    registerPage.registerFlow("Dan", "Fisher", "o", "1112222", email);
////    TODO to be fixed
////    expect(registerPage.loadingBanner.isDisplayed()).toBe(true);
//    browser.driver.sleep(2200);
//    expect(browser.driver.getCurrentUrl()).toMatch(/\/register/);
//    expect(registerPage.signUpSuccessMsg.isDisplayed()).toBe(false);

  });







  /*it('P_WS_MVP6_2 Should redirect to  Account after click login button the first time', function() {
    indexPage.loginButton.click();
    clib.waitCurrentURL();
    var cookie = browser.driver.getCookies;
    console.log(cookie);
    expect(browser.getLocationAbsUrl()).toContain('welcome');
    expect(welcomePage.welcomeLogo.isDisplayed()).toBe(true);
  });*/

});
