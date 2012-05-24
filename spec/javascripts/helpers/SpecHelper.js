beforeEach(function() {
  this.addMatchers({
    toHaveOwnPropery: function(expectedProperty) {
      var obj = this.actual;
      return obj.hasOwnProperty(expectedProperty);
    }
  });
});
