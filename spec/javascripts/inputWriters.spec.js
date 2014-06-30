describe('input writers', function() {
  describe('when registering an input writer for an input with a type attribute', function() {
    beforeEach(function() {
      this.writer = function() {};
      Backbone.Syphon.InputWriters.register('foo', this.writer);
      this.found = Backbone.Syphon.InputWriters.get('foo');
    });

    afterEach(function() {
      Backbone.Syphon.InputWriters.register('foo');
    });

    it('should be able to retrieve the input writer for that type', function() {
      expect(this.found).to.equal(this.writer);
    });
  });

  describe('when retrieving a writer for an input with no type attribute', function() {
    beforeEach(function() {
      this.writer = function() {};
      Backbone.Syphon.InputWriters.register('text', this.writer);
      this.found = Backbone.Syphon.InputWriters.get('text');
    });

    afterEach(function() {
      Backbone.Syphon.InputWriters.register('text');
    });

    it('should retrieve the registered "text" writer', function() {
      expect(this.found).to.equal(this.writer);
    });
  });

  describe('when registering an input writer for an input element that does not have a "type" attribute', function() {
    beforeEach(function() {
      this.writer = function() {};
      Backbone.Syphon.InputWriters.register('textarea', this.writer);
      this.found = Backbone.Syphon.InputWriters.get('textarea');
    });

    afterEach(function() {
      Backbone.Syphon.InputWriters.register('textarea');
    });

    it('should be able to retrieve the input writer for that type', function() {
      expect(this.found).to.equal(this.writer);
    });
  });

  describe('when unregistering an input writer', function() {
    beforeEach(function() {
      this.writer = function() {};
      Backbone.Syphon.InputWriters.register('foo', this.writer);

      Backbone.Syphon.InputWriters.unregister('foo');
      this.found = Backbone.Syphon.InputWriters.get('foo');
    });

    it('should no longer find the input writer for that type', function() {
      expect(this.found).not.to.equal(this.writer);
    });
  });

  describe('when specifying input writers in the options for unserialize', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html('<form><input name="foo"></form>');
        }
      });

      this.writers = new Backbone.Syphon.InputWriterSet();
      this.writers.registerDefault(function($el, value){
        $el.data('stuff', value);
      });

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, { foo: 'bar' }, {
        inputWriters: this.writers
      });
      this.result = this.view.$('input[name=foo]').data('stuff');
    });

    it('should use the specified input writer', function() {
      expect(this.result).to.equal('bar');
    });
  });
});
