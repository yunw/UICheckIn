/**
 * Created by yunwang on 7/27/15.
 */


var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


var emailActivateProcess = function (userName) {
  var userMailURL = "http://mailinator.com/inbox.jsp?to=".concat(userName);
  driver.get(userMailURL)
//  TODO need complete
//  find string : Activate your  Account and click the link;
//


}

var globalTools = function() {
  return {
    getRandomInt: getRandomInt,
    emailActivateProcess: emailActivateProcess
  }
}

module.exports = globalTools;
