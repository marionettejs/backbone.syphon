describe("serializing a form", function(){
  
  describe("when serializing a text input", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo' value='bar'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should return an object with a key from the text input name", function(){
      expect(result.hasOwnProperty("foo")).toBe(true)
    });

    it("should have the input's value", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when serializing a textarea", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><textarea name='foo'>bar</textarea></form>");
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
        this.$el.html("<form><select name='foo'><option value='bar'>bar</option></select></form>");
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
        this.$el.html("<form><input type='checkbox' id='the-checkbox' name='chk'></form>");
      }
    });

    describe("and the checkbox is checked", function(){
      var view, result;

      beforeEach(function(){
        view = new View();
        view.render();
        view.$("#the-checkbox").prop("checked", true);

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

  describe("when serializing a button", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><button name='btn' value='foo'>foo</button></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should not have the button's value", function(){
      expect(result.hasOwnProperty("btn")).toBe(false);
    });
  });

  describe("when serializing an input with type of 'submit'", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='submit' name='btn' value='foo' text='Foo'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should not have the button's value", function(){
      expect(result.hasOwnProperty("btn")).toBe(false);
    });
  });

  describe("when serializing an input with type of 'reset'", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='reset' name='btn' value='foo' text='Foo'></form>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should not have the button's value", function(){
      expect(result.hasOwnProperty("btn")).toBe(false);
    });
  });

  describe("when serializing a radio button group", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='radio' name='foo' value='foo'><input type='radio' name='foo' value='bar' checked><input type='radio' name='foo' value='baz'>");
      }
    });

    var view, result;

    beforeEach(function(){
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("should only return the value of the selected radio button", function(){
      expect(result.foo).toBe("bar");
    });
  });

  describe("when the view is actually a form", function() {
    var View = Backbone.View.extend({
      tagName: "form",
      render: function(){
        this.$el.html("<input type='text' name='foo' value='bar'>");
      }
    });

    beforeEach(function() {
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("retrieves the inputs' values", function() {
      expect(result.foo).toBe("bar");
    });
  });

  describe("when the view has nested naming", function() {
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo.bar' value='qux'></form>");
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

    it("retrieves the value for the nested property",function() {
      expect(result.foo.bar).toBe("qux");
    });

  });

  describe("Value assignment", function() {
    it ("assigns a value to a direct level key", function() {
      var data = {}
        , key = "foo"
        , keychain = key.split(".")
        , value = "bar";

      expect(Backbone.Syphon._assign(data,keychain,value).foo).toBe("bar");

    });

    it ("assigns a value to a indirect level key", function() {
      var data = {}
        , key = "foo.bar"
        , keychain = key.split(".")
        , value = "qux";

      expect(Backbone.Syphon._assign(data,keychain,value).foo.bar).toBe("qux");

    });

    it ("assigns a value to a indirect level key next to a sibling", function() {
      var data = { 
        foo: {
          baz: "quxx"
        }
      }
        , key = "foo.bar"
        , keychain = key.split(".")
        , value = "qux";

      expect(Backbone.Syphon._assign(data,keychain,value).foo.bar).toBe("qux");
      expect(Backbone.Syphon._assign(data,keychain,value).foo.baz).toBe("quxx");

    });
  });

});
