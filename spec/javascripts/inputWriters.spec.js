describe('input writers', function() {
  describe('when registering an input writer for an input with a type attribute', function() {
    var writer, found;

    beforeEach(function() {
      writer = function() {};
      Backbone.Syphon.InputWriters.register('foo', writer);
      found = Backbone.Syphon.InputWriters.get('foo');
    });

    afterEach(function() {
      Backbone.Syphon.InputWriters.register('foo');
    });

    it('should be able to retrieve the input writer for that type', function() {
      expect(found).to.equal(writer);
    });
  });

  describe('when retrieving a writer for an input with no type attribute', function() {
    var writer, found;

    beforeEach(function() {
      writer = function() {};
      Backbone.Syphon.InputWriters.register('text', writer);
      found = Backbone.Syphon.InputWriters.get('text');
    });

    afterEach(function() {
      Backbone.Syphon.InputWriters.register('text');
    });

    it('should retrieve the registered "text" writer', function() {
      expect(found).to.equal(writer);
    });
  });

  describe('when registering an input writer for an input element that does not have a "type" attribute', function() {
    var writer, found;

    beforeEach(function() {
      writer = function() {};
      Backbone.Syphon.InputWriters.register('textarea', writer);
      found = Backbone.Syphon.InputWriters.get('textarea');
    });

    afterEach(function() {
      Backbone.Syphon.InputWriters.register('textarea');
    });

    it('should be able to retrieve the input writer for that type', function() {
      expect(found).to.equal(writer);
    });
  });

  describe('when unregistering an input writer', function() {
    var writer, found;

    beforeEach(function() {
      writer = function() {};
      Backbone.Syphon.InputWriters.register('foo', writer);

      Backbone.Syphon.InputWriters.unregister('foo');
      found = Backbone.Syphon.InputWriters.get('foo');
    });

    it('should no longer find the input writer for that type', function() {
      expect(found).not.to.equal(writer);
    });
  });

  describe('when specifying input writers in the options for unserialize', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html('<form><input name="foo"></form>');
        }
      });

      var writers = new Backbone.Syphon.InputWriterSet();
      writers.registerDefault(function($el, value){
        $el.data('stuff', value);
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: 'bar' }, {
        inputWriters: writers
      });
      result = view.$('input[name=foo]').data('stuff');
    });

    it('should use the specified input writer', function() {
      expect(result).to.equal('bar');
    });
  });
});
