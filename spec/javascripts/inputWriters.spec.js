describe("input writers", function(){
  
  describe("when registering an input writer for an input with a type attribute", function(){
    var writer = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputWriters.register("foo", writer);
    });

    afterEach(function(){
      Backbone.Syphon.InputWriters.register("foo");
    });

    it("should be able to retrieve the input writer for that type", function(){
      var found = Backbone.Syphon.InputWriters.get("foo");
      expect(found).toBe(writer);
    });
  });

  describe("when retrieving a writer for an input with no type attribute", function(){
    var writer = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputWriters.register("text", writer);
    });

    afterEach(function(){
      Backbone.Syphon.InputWriters.register("text");
    });

    it("should retrieve the registered 'text' writer", function(){
      var found = Backbone.Syphon.InputWriters.get("text");
      expect(found).toBe(writer);
    });
  });

  describe("when registering an input writer for an input element that does not have a 'type' attribute", function(){
    var writer = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputWriters.register("textarea", writer);
    });

    afterEach(function(){
      Backbone.Syphon.InputWriters.register("textarea");
    });

    it("should be able to retrieve the input writer for that type", function(){
      var found = Backbone.Syphon.InputWriters.get("textarea");
      expect(found).toBe(writer);
    });
  });

  describe("when unregistering an input writer", function(){
    var writer = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputWriters.register("foo", writer);

      Backbone.Syphon.InputWriters.unregister("foo");
    });

    it("should no longer find the input writer for that type", function(){
      var found = Backbone.Syphon.InputWriters.get("foo");
      expect(found).not.toBe(writer);
    });
  });

  describe("when specifying input writers in the options for unserialize", function(){
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("<form><input name='foo'></form>");
      }
    });
    
    var view;

    beforeEach(function(){
      var writers = new Backbone.Syphon.InputWriterSet();
      writers.registerDefault(function($el, value){
        $el.data("stuff", value);
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: "bar" }, {
        inputWriters: writers
      });
    });

    it("should use the specified input writer", function(){
      var result = view.$("input[name=foo]").data("stuff");
      expect(result).toBe("bar");
    });
  });

});
