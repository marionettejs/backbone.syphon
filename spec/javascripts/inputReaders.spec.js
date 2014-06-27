describe('input readers', function() {
  describe('when registering an input reader for an input with a type attribute', function() {
    var reader;

    beforeEach(function() {
      reader = function() {};
      Backbone.Syphon.InputReaders.register('foo', reader);
    });

    afterEach(function() {
      Backbone.Syphon.InputReaders.register('foo');
    });

    it('should be able to retrieve the input reader for that type', function() {
      var found = Backbone.Syphon.InputReaders.get('foo');
      expect(found).to.equal(reader);
    });
  });

  describe('when retrieving a reader for an input with no type attribute', function() {
    var reader, found;

    beforeEach(function() {
      reader = function() {};
      Backbone.Syphon.InputReaders.register('text', reader);
      found = Backbone.Syphon.InputReaders.get('text');
    });

    afterEach(function() {
      Backbone.Syphon.InputReaders.register('text');
    });

    it('should retrieve the registered "text" reader', function() {
      expect(found).to.equal(reader);
    });
  });

  describe('when registering an input reader for an input element that does not have a "type" attribute', function() {
    var reader, found;

    beforeEach(function() {
      reader = function() {};
      Backbone.Syphon.InputReaders.register('textarea', reader);
      found = Backbone.Syphon.InputReaders.get('textarea');
    });

    afterEach(function() {
      Backbone.Syphon.InputReaders.register('textarea');
    });

    it('should be able to retrieve the input reader for that type', function() {
      expect(found).to.equal(reader);
    });
  });

  describe('when unregistering an input reader', function() {
    var reader, found;

    beforeEach(function() {
      reader = function() {};
      Backbone.Syphon.InputReaders.register('foo', reader);

      Backbone.Syphon.InputReaders.unregister('foo');
      found = Backbone.Syphon.InputReaders.get('foo');
    });

    it('should no longer find the input reader for that type', function() {
      expect(found).not.to.equal(reader);
    });
  });

  describe('when specifying input readers in the options for serialize', function() {
    var result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html('<form><input name="foo" data-stuff="bar"></form>');
        }
      });

      var readers = new Backbone.Syphon.InputReaderSet();
      readers.registerDefault(function($el) {
        return $el.data('stuff');
      });

      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        inputReaders: readers
      });
    });

    it('should use the specified input reader', function() {
      expect(result.foo).to.equal('bar');
    });
  });
});
