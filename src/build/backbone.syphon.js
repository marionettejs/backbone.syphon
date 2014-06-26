(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
      return factory(_, Backbone, $);
    });
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var $ = require('jquery');
    module.exports = factory(_, Backbone, $);
  } else {
    factory(root._, root.Backbone, root.jQuery);
  }

}(this, function(_, Backbone, $) {
  'use strict';

  var previousSyphon = Backbone.Syphon;

  var Syphon = Backbone.Syphon = {};

  Syphon.VERSION = '<%= version %>';

  Syphon.noConflict = function() {
    Backbone.Syphon = previousSyphon;
    return this;
  };

  // @include ../backbone.syphon.js
  // @include ../backbone.syphon.typeregistry.js
  // @include ../backbone.syphon.keyextractors.js
  // @include ../backbone.syphon.inputreaders.js
  // @include ../backbone.syphon.inputwriters.js
  // @include ../backbone.syphon.keyassignmentvalidators.js
  // @include ../backbone.syphon.keysplitter.js
  // @include ../backbone.syphon.keyjoiner.js

  return Backbone.Syphon;
}));
