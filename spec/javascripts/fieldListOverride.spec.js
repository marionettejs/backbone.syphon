describe("override the list of fields to include or ignore", function(){
  var View = Backbone.View.extend({
    render: function(){
      this.$el.html("<form><input name='a'><input name='b'><input name='c'><input name='d'><input name='e'></form>");
    }
  });


  describe("when providing a list of fields to include in the result", function(){
    var result;

    beforeEach(function(){
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should include the specified fields", function(){
      expect(result).toHaveOwnProperty("a");
      expect(result).toHaveOwnProperty("b");
    });

    it("should ignore all other fields", function(){
      expect(result).not.toHaveOwnProperty("c");
      expect(result).not.toHaveOwnProperty("d");
      expect(result).not.toHaveOwnProperty("e");
    });
  });

  describe("when providing a list of fields to ignore in the result", function(){
    var result;

    beforeEach(function(){
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should ignore the specified fields", function(){
      expect(result).not.toHaveOwnProperty("a");
      expect(result).not.toHaveOwnProperty("b");
    });

    it("should include all other fields", function(){
      expect(result).toHaveOwnProperty("c");
      expect(result).toHaveOwnProperty("d");
      expect(result).toHaveOwnProperty("e");
    });
  });
});
