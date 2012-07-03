describe("serializing nested key names", function(){

  describe("when the view has nested naming with a .", function() {
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo.bar' value='baz'><input type='text' name='foo.baz' value='qux'></form>");
      }
    });

    beforeEach(function() {
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("has a nested property defined",function() {
      expect(result.foo.bar).toBeDefined();
    });

    it("has a nested, sibling property defined",function() {
      expect(result.foo.baz).toBeDefined();
    });

    it("retrieves the value for the nested property",function() {
      expect(result.foo.bar).toBe("baz");
    });

    it("retrieves the value for the nested, sibling property",function() {
      expect(result.foo.baz).toBe("qux");
    });

  });

});
