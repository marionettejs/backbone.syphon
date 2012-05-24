describe("override the list of fields to include or ignore", function(){
  var View = Backbone.View.extend({
    render: function(){
      this.$el.html("<form><input name='a'><input name='b'><input name='c'><input name='d'><button name='e'></form>");
    }
  });

  describe("when specifying which fields to include", function(){
    var result;

    beforeEach(function(){
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        include: ["a", "b"]
      });
    });

    it("should include the specified fields", function(){
      expect(result).toHaveOwnProperty("a");
      expect(result).toHaveOwnProperty("b");
    });

    it("should not include other fields", function(){
      expect(result).not.toHaveOwnProperty("c");
      expect(result).not.toHaveOwnProperty("d");
      expect(result).not.toHaveOwnProperty("e");
    });
  });

  describe("when including a field that is an ignored type", function(){
    var result;

    beforeEach(function(){
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        include: ["e"]
      });
    });

    it("should include the specified field", function(){
      expect(result).toHaveOwnProperty("e");
    });
  });

  describe("when specifying fields to exclude", function(){
    var result;

    beforeEach(function(){
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        exclude: ["a", "b"]
      });
    });

    it("should ignore the specified fields", function(){
      expect(result).not.toHaveOwnProperty("a");
      expect(result).not.toHaveOwnProperty("b");
    });

    it("should include all other fields", function(){
      expect(result).toHaveOwnProperty("c");
      expect(result).toHaveOwnProperty("d");
    });
  });

  describe("when specifying fields to include that have also been excluded", function(){
    var result;

    beforeEach(function(){
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        include: ["a", "b"],
        exclude: ["a", "b"]
      });
    });

    it("should include the specified fields", function(){
      expect(result).toHaveOwnProperty("a");
      expect(result).toHaveOwnProperty("b");
    });
  });
});
