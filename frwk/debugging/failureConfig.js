/**
 * Created by yunwang on 7/8/15.
 */

var env = require('../config/protractorConf.js');

// Examples of tests to show how debugging works with Protractor. Tests
// should be run against the testapp.
exports.config = {
//  seleniumAddress: env.seleniumAddress,
//  seleniumAddress: env.seleniumPort,

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
    'prd_e2e_test.js.js'
  ],

  capabilities: env.capabilities,

  baseUrl: env.baseUrl,

  // ----- Options to be passed to minijasminenode.
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true
  }
};