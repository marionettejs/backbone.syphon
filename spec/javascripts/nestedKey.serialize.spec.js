describe("serializing nested key names", function(){

  describe("when the view has nested naming with []", function() {
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("\
          <form>\
          <input type='text' name='widget' value='wombat'>\
          <input type='text' name='foo[bar]' value='baz'>\
          <input type='text' name='foo[baz][quux]' value='qux'>\
          </form>\
        ");
      }
    });

    beforeEach(function() {
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it("has a property defined",function() {
      expect(result.widget).toBeDefined();
    });

    it("retrieves the value for the property",function() {
      expect(result.widget).toBe("wombat");
    });

    it("has a nested property defined",function() {
      expect(result.foo.bar).toBeDefined();
    });

    it("retrieves the value for the nested property",function() {
      expect(result.foo.bar).toBe("baz");
    });

    it("has a nested, sibling property defined",function() {
      expect(result.foo.baz.quux).toBeDefined();
    });

    it("retrieves the value for the nested, sibling property",function() {
      expect(result.foo.baz.quux).toBe("qux");
    });

  });

  describe("when the view has nested naming with a .", function() {
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("\
          <form>\
          <input type='text' name='widget' value='wombat'>\
          <input type='text' name='foo.bar' value='baz'>\
          <input type='text' name='foo.baz.quux' value='qux'>\
          </form>\
        ");
      }
    });

    beforeEach(function() {
      this.keySplitter = Backbone.Syphon.KeySplitter;

      Backbone.Syphon.KeySplitter = function(key){
        return key.split(".");
      }
      
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    afterEach(function(){
      Backbone.Syphon.KeySplitter = this.keySplitter;
    });

    it("has a property defined",function() {
      expect(result.widget).toBeDefined();
    });

    it("retrieves the value for the property",function() {
      expect(result.widget).toBe("wombat");
    });

    it("has a nested property defined",function() {
      expect(result.foo.bar).toBeDefined();
    });

    it("retrieves the value for the nested property",function() {
      expect(result.foo.bar).toBe("baz");
    });

    it("has a nested, sibling property defined",function() {
      expect(result.foo.baz.quux).toBeDefined();
    });

    it("retrieves the value for the nested, sibling property",function() {
      expect(result.foo.baz.quux).toBe("qux");
    });

  });

  describe("when the keys are split by a custom splitter in the serialize call", function() {
    var View = Backbone.View.extend({
      render: function(){
        this.$el.html("\
          <form>\
          <input type='text' name='widget' value='wombat'>\
          <input type='text' name='foo-bar' value='baz'>\
          <input type='text' name='foo-baz-quux' value='qux'>\
          </form>\
        ");
      }
    });

    beforeEach(function() {
      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        keySplitter: function(key){
          return key.split("-");
        }
      });
    });

    it("has a property defined",function() {
      expect(result.widget).toBeDefined();
    });

    it("retrieves the value for the property",function() {
      expect(result.widget).toBe("wombat");
    });

    it("has a nested property defined",function() {
      expect(result.foo.bar).toBeDefined();
    });

    it("retrieves the value for the nested property",function() {
      expect(result.foo.bar).toBe("baz");
    });

    it("has a nested, sibling property defined",function() {
      expect(result.foo.baz.quux).toBeDefined();
    });

    it("retrieves the value for the nested, sibling property",function() {
      expect(result.foo.baz.quux).toBe("qux");
    });

  });

});
