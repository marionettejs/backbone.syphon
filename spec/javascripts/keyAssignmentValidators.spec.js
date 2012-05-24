describe("key assignment validators", function(){

  describe("when specifying key assignment validators in the options for serialize", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input data-stuff='bar' name='bar' value='a'><input data-stuff='foo' name='foo' value='b'></form>");
      }
    });

    var result;
    beforeEach(function(){
      var validators = new Backbone.Syphon.KeyAssignmentValidatorSet();
      validators.registerDefault(function($el, key, value){
        return $el.data("stuff") == "bar";
      });

      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        keyAssignmentValidators: validators
      });
    });

    it("should use the specified validators to include the right field", function(){
      expect(result).toHaveOwnProperty("bar");
    });

    it("should use the specified validators to exclude the right field", function(){
      expect(result).not.toHaveOwnProperty("foo");
    });
  });

});
