describe("deserializing an object into a form", function(){

  describe("when deserializing into a text input", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='text' name='foo'></form>");
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();
      
      Backbone.Syphon.deserialize(view, { foo: "bar" });
    });
    
    it("should set the input's value to the corresponding value in the given object", function(){
      var result = view.$('input[name=foo]').val();
      expect(result).toBe("bar");
    });
  });

  describe("when deserializing into a textarea", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><textarea name='foo'></textarea></form>");
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: "bar" });
    });

    it("should set the input's value to the corresponding value in the given object", function(){
      var result = view.$('textarea[name=foo]').val();
      expect(result).toBe("bar");
    });
  });

  describe("when deserializing into a select box", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><select name='foo'><option value='baz'>baz</option><option value='bar'>bar</option></select></form>");
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: "bar" });
    });
    
    it("should select the option corresponding to the value in the given object", function(){
      var result = view.$("select").val();
      expect(result).toBe("bar");
    });
  });

  describe("when deserializing into a checkbox", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='checkbox' id='the-checkbox' name='chk'></form>");
      }
    });

    describe("and the corresponding value in the given object is true", function(){
      var view;

      beforeEach(function(){
        view = new View();
        view.render();

        Backbone.Syphon.deserialize(view, { chk: true });
      });

      it("should check the checkbox", function(){
        var result = view.$("#the-checkbox").prop("checked");
        expect(result).toBe(true);
      });
    });

    describe("and the corresponding value in the given object is false", function(){
      var view;

      beforeEach(function(){
        view = new View();
        view.render();
        view.$("#the-checkbox").prop("checked", true);

        Backbone.Syphon.deserialize(view, { chk: false });
      });

      it("should uncheck the checkbox", function(){
        var result = view.$("#the-checkbox").prop("checked");
        expect(result).toBe(false);
      });
    });

  });

  describe("when deserializing into a button", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><button name='btn'>foo</button></form>");
      }
    });

    var view, value;

    beforeEach(function(){
      view = new View();
      view.render();
      value = view.$("button[name=btn]").val();

      Backbone.Syphon.deserialize(view, { btn: "foo" });
    });

    it("the button value should remain unchanged", function(){
      var result = view.$("button[name=btn]").val();
      expect(result).toBe(value);
    });
  });

  describe("when deserializing into an input with type of 'submit'", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='submit' name='btn' text='Foo'></form>");
      }
    });

    var view, value;

    beforeEach(function(){
      view = new View();
      view.render();
      value = view.$("input[name=btn]").val();

      Backbone.Syphon.deserialize(view, { btn: "foo" });
    });

    it("the input value should remain unchanged", function(){
      var result = view.$("input[name=btn]").val();
      expect(result).toBe(value);
    });
  });
  
  describe("when deserializing into an input with type of 'reset'", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='reset' name='btn' text='Foo'></form>");
      }
    });

    var view, value;

    beforeEach(function(){
      view = new View();
      view.render();
      value = view.$("input[name=btn]").val();

      Backbone.Syphon.deserialize(view, { btn: "foo" });
    });

    it("the input should not have a value", function(){
      var result = view.$("input[name=btn]").val();
      expect(result).toBe(value);
    });
  });

  describe("when deserializing into a radio button group", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input type='radio' name='foo' value='foo'><input type='radio' name='foo' value='bar'><input type='radio' name='foo' value='baz'>");
      }
    });

    var view;

    beforeEach(function(){
      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: "bar" });
    });

    it("should select the corresponding radio button", function(){
      var checked = view.$("input[name=foo][value=bar]").prop("checked");
      expect(checked).toBe(true);
    });
  });

  describe("when given a form element instead of a view", function() {
    var form;

    beforeEach(function(){
      form = $("<form><input type='text' name='foo' value='bar'></form>")[0];

      Backbone.Syphon.deserialize(form, { foo: "bar" });
    });

    it("should set the input's value to the corresponding value in the given object", function(){
      var result = $(form).find('input[name=foo]').val();
      expect(result).toBe("bar");
    });
  });

});
