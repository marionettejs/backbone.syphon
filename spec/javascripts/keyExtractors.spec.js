describe('key extractors', function() {
  beforeEach(function() {
    this.defaultExtractor = Backbone.Syphon.KeyExtractors.get();
  });

  describe('when registering a global key extractor', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
              '<form>' +
              '<input>' +
              '</form>'
          );
        }
      });

      Backbone.Syphon.KeyExtractors.registerDefault(function() {
        return 'foo';
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    afterEach(function() {
      Backbone.Syphon.KeyExtractors.registerDefault(this.defaultExtractor);
    });

    it('should return an object that has a key produced by the key extractor', function() {
      expect(this.result).to.have.ownProperty('foo');
    });
  });

  describe('when registering a key extractor for a specific input type', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
              '<form>' +
              '<input>' +
              '<input type="checkbox" name="chk">' +
              '</form>'
          );
        }
      });

      Backbone.Syphon.KeyExtractors.register('text', function() {
        return 'foo';
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    afterEach(function() {
      Backbone.Syphon.KeyExtractors.unregister('text');
    });

    it('should use the specific extractor for inputs of that type', function() {
      expect(this.result).to.have.ownProperty('foo');
    });

    it('should use the default extractor for other input types', function() {
      expect(this.result).to.have.ownProperty('chk');
    });
  });

  describe('when specifying key extractor in the options for serialize', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
              '<form>' +
              '<input data-stuff="bar">' +
              '</form>'
          );
        }
      });

      this.extractors = new Backbone.Syphon.KeyExtractorSet();
      this.extractors.registerDefault(function($el) {
        return $el.data('stuff');
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        keyExtractors: this.extractors
      });
    });

    it('should use the specified key extractors', function() {
      expect(this.result).to.have.ownProperty('bar');
    });
  });
});
