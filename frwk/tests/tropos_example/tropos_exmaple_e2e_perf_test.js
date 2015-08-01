/**
 * Created by yunwang on 6/12/15.
 */

var apiModelPage = require('../../page_objects/prd.example/prdExampleMainPage.js');

//var ProtractorPerf = require('protractor-perf');
//var PerfRunner = require('..');

describe('prd Example E2E Test', function() {
  var Page;
  var perf = new ProtractorPerf(protractor);

  var perfRunner = new PerfRunner(protractor, browser);

  beforeEach(function(){
    Page = new apiModelPage();

  });

  it('P_10_WS_4-1 Should go to prd example demo page', function() {
    perfRunner.start();
    expect(apiPage.exampleHeader.isPresent()).toBe(true);
    perfRunner.stop();
    if (perfRunner.isEnabled) { // Is perf measuring enabled ?
      // Check for perf regressions, just like you check for functional regressions
      expect(perfRunner.getStats('meanFrameTime')).toBeLessThan(60);
    };
  });

  it('P_10_WS_4-2 Should click the button', function() {
    expect(apiPage.ClickLeftButton).toContain("Clicked left!");
  });


});