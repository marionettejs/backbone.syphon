describe('serializing nested key names', function() {
  describe('when the view has nested naming with []', function() {
    var result, view;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="widget" value="wombat">' +
              '<input type="text" name="foo[bar]" value="baz">' +
              '<input type="text" name="foo[baz][quux]" value="qux">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('has a property defined', function() {
      expect(result.widget).to.exist;
    });

    it('retrieves the value for the property', function() {
      expect(result.widget).to.equal('wombat');
    });

    it('has a nested property defined', function() {
      expect(result.foo.bar).to.exist;
    });

    it('retrieves the value for the nested property', function() {
      expect(result.foo.bar).to.equal('baz');
    });

    it('has a nested, sibling property defined', function() {
      expect(result.foo.baz.quux).to.exist;
    });

    it('retrieves the value for the nested, sibling property', function() {
      expect(result.foo.baz.quux).to.equal('qux');
    });
  });

  describe('when the view has nested naming with [] and ends with [] for an array', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="checkbox" name="foo[bar][]" value="baz" checked="checked">' +
              '<input type="checkbox" name="foo[bar][]" value="qux" checked="checked">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      var inputReaders = new Backbone.Syphon.InputReaderSet();
      inputReaders.register('checkbox', function($el) {
        return $el.val();
      });

      result = Backbone.Syphon.serialize(view, {
        inputReaders: inputReaders
      });
    });

    it('has a nested property defined', function() {
      expect(result.foo.bar).to.exist;
    });

    it('should have the first value', function() {
      expect(result.foo.bar[0]).to.equal('baz');
    });

    it('should have the second value', function() {
      expect(result.foo.bar[1]).to.equal('qux');
    });
  });

  describe('when the view has nested naming with a .', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="widget" value="wombat">' +
              '<input type="text" name="foo.bar" value="baz">' +
              '<input type="text" name="foo.baz.quux" value="qux">' +
            '</form>'
          );
        }
      });

      this.keySplitter = Backbone.Syphon.KeySplitter;

      Backbone.Syphon.KeySplitter = function(key){
        return key.split('.');
      };

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    afterEach(function() {
      Backbone.Syphon.KeySplitter = this.keySplitter;
    });

    it('has a property defined', function() {
      expect(result.widget).to.exist;
    });

    it('retrieves the value for the property', function() {
      expect(result.widget).to.equal('wombat');
    });

    it('has a nested property defined', function() {
      expect(result.foo.bar).to.exist;
    });

    it('retrieves the value for the nested property', function() {
      expect(result.foo.bar).to.equal('baz');
    });

    it('has a nested, sibling property defined', function() {
      expect(result.foo.baz.quux).to.exist;
    });

    it('retrieves the value for the nested, sibling property', function() {
      expect(result.foo.baz.quux).to.equal('qux');
    });
  });

  describe('when the keys are split by a custom splitter in the serialize call', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="widget" value="wombat">' +
              '<input type="text" name="foo-bar" value="baz">' +
              '<input type="text" name="foo-baz-quux" value="qux">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        keySplitter: function(key){
          return key.split('-');
        }
      });
    });

    it('has a property defined', function() {
      expect(result.widget).to.exist;
    });

    it('retrieves the value for the property', function() {
      expect(result.widget).to.equal('wombat');
    });

    it('has a nested property defined', function() {
      expect(result.foo.bar).to.exist;
    });

    it('retrieves the value for the nested property', function() {
      expect(result.foo.bar).to.equal('baz');
    });

    it('has a nested, sibling property defined', function() {
      expect(result.foo.baz.quux).to.exist;
    });

    it('retrieves the value for the nested, sibling property', function() {
      expect(result.foo.baz.quux).to.equal('qux');
    });
  });
});
