(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["_", "jQuery","Backbone"], factory);
    }
}(this, function (_, jQuery, Backbone) {
  //= backbone.syphon.js
  return Backbone.Syphon;
}));
