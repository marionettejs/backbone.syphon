if (!global.document || !global.window) {
  var jsdom = require('jsdom');

  global.document = jsdom.jsdom('<html><head><script></script></head><body></body></html>', {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script'],
    MutationEvents: '2.0',
    QuerySelector: false
  });

  global.window = document.defaultView;
  global.navigator = global.window.navigator;

  global.window.Node.prototype.contains = function(node) {
    return this.compareDocumentPosition(node) & 16;
  };
}

if (process.env.USE_LODASH) {
  global._ = require('lodash');
}
else {
  global._ = require('underscore');

}
global.$ = global.jQuery = require('jquery');
global.Backbone = require('backbone');
global.Backbone.$ = global.$;
global.Syphon = require('../../../tmp/backbone.syphon');

var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiJquery = require('chai-jquery');

chai.use(sinonChai);
chai.use(chaiJquery);

global.expect = chai.expect;
