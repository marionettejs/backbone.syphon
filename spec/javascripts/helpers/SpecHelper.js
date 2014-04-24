beforeEach(function() {
  jasmine.addMatchers({
    toHaveOwnProperty: function() {
      return {
        compare: function (actual, expected) {
          return {
            pass: _.has(actual, expected)
          };
        }
      };
    }
  });
});
