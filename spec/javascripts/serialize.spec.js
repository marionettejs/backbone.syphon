describe("serializing a form", function(){

  describe("when serializing a text input", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' id='foo' value='bar'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should return an object with a key from the text input id", function(){
      expect(result.foo).not.toBeUndefined();
    });

    it("should have the input's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a textarea", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><textarea id='foo'>bar</textarea></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should have the textarea's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a select box", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><select id='foo'><option value='bar'>bar</option></select></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should have the textarea's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a checkbox", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='checkbox' id='chk'></form>");
      }
    });

    describe("and the checkbox is checked", function(){
      var view, result;

      beforeEach(function(){
        view = new View();
        view.render();
        view.$("#chk").prop("checked", true);

        result = Backbone.Syphon.serialize(view);
      });

      it("should return an object with a value of true", function(){
        expect(result.chk).toBe(true);
      });
    });

    describe("and the checkbox is not checked", function(){
      var view, result;

      beforeEach(function(){
        view = new View();
        view.render();

        result = Backbone.Syphon.serialize(view);
      });

      it("should return an object with a value of false", function(){
        expect(result.chk).toBe(false);
      });
    });

  });

});
