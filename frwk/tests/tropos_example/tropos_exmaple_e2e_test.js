/**
 * Created by yunwang on 6/12/15.
 */

var apiModelPage = require('../../page_objects/prd_example/prdExampleMainPage.js');

describe('prd Example E2E Test', function() {
  var apiPage;

  beforeEach(function(){
    apiPage = new apiModelPage();
  });

  it('P_10_WS_4-1 Should go to prd example demo page', function() {
    expect(apiPage.exampleHeader.isPresent()).toBe(true);
  });

  it('P_10_WS_4-2 Should click the button', function() {
    expect(apiPage.ClickLeftButton).toContain("Clicked left!");
      });

});