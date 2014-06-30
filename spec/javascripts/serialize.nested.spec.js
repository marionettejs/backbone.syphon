describe('serializing nested key names', function() {
  describe('when the view has nested naming with []', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('has a property defined', function() {
      expect(this.result.widget).to.exist;
    });

    it('retrieves the value for the property', function() {
      expect(this.result.widget).to.equal('wombat');
    });

    it('has a nested property defined', function() {
      expect(this.result.foo.bar).to.exist;
    });

    it('retrieves the value for the nested property', function() {
      expect(this.result.foo.bar).to.equal('baz');
    });

    it('has a nested, sibling property defined', function() {
      expect(this.result.foo.baz.quux).to.exist;
    });

    it('retrieves the value for the nested, sibling property', function() {
      expect(this.result.foo.baz.quux).to.equal('qux');
    });
  });

  describe('when the view has nested naming with [] and ends with [] for an array', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="checkbox" name="foo[bar][]" value="baz" checked="checked">' +
              '<input type="checkbox" name="foo[bar][]" value="qux" checked="checked">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.inputReaders = new Backbone.Syphon.InputReaderSet();
      this.inputReaders.register('checkbox', function($el) {
        return $el.val();
      });

      this.result = Backbone.Syphon.serialize(this.view, {
        inputReaders: this.inputReaders
      });
    });

    it('has a nested property defined', function() {
      expect(this.result.foo.bar).to.exist;
    });

    it('should have the first value', function() {
      expect(this.result.foo.bar[0]).to.equal('baz');
    });

    it('should have the second value', function() {
      expect(this.result.foo.bar[1]).to.equal('qux');
    });
  });

  describe('when the view has nested naming with a .', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    afterEach(function() {
      Backbone.Syphon.KeySplitter = this.keySplitter;
    });

    it('has a property defined', function() {
      expect(this.result.widget).to.exist;
    });

    it('retrieves the value for the property', function() {
      expect(this.result.widget).to.equal('wombat');
    });

    it('has a nested property defined', function() {
      expect(this.result.foo.bar).to.exist;
    });

    it('retrieves the value for the nested property', function() {
      expect(this.result.foo.bar).to.equal('baz');
    });

    it('has a nested, sibling property defined', function() {
      expect(this.result.foo.baz.quux).to.exist;
    });

    it('retrieves the value for the nested, sibling property', function() {
      expect(this.result.foo.baz.quux).to.equal('qux');
    });
  });

  describe('when the keys are split by a custom splitter in the serialize call', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        keySplitter: function(key) {
          return key.split('-');
        }
      });
    });

    it('has a property defined', function() {
      expect(this.result.widget).to.exist;
    });

    it('retrieves the value for the property', function() {
      expect(this.result.widget).to.equal('wombat');
    });

    it('has a nested property defined', function() {
      expect(this.result.foo.bar).to.exist;
    });

    it('retrieves the value for the nested property', function() {
      expect(this.result.foo.bar).to.equal('baz');
    });

    it('has a nested, sibling property defined', function() {
      expect(this.result.foo.baz.quux).to.exist;
    });

    it('retrieves the value for the nested, sibling property', function() {
      expect(this.result.foo.baz.quux).to.equal('qux');
    });
  });
});
