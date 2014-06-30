describe('deserializing nested key names', function() {
  describe('when the view has nested naming with []', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="widget">' +
              '<input type="text" name="foo[bar]">' +
              '<input type="text" name="foo[baz][qux]">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, {
        widget: 'wombat',
        foo: {
          bar: 'baz',
          baz: {
            qux: 'qux'
          }
        }
      });
    });

    it('should set root values', function() {
      expect(this.view.$('[name="widget"]')).to.have.value('wombat');
    });

    it('should set first nested value', function() {
      expect(this.view.$('[name="foo[bar]"]')).to.have.value('baz');
    });

    it('should set sibling nested value', function() {
      expect(this.view.$('[name="foo[baz][qux]"]')).to.have.value('qux');
    });
  });

  describe('when the view has nested naming with [] and ends with [] for an array, on checkboxes', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="checkbox" name="foo[bar][]" value="baz">' +
              '<input type="checkbox" name="foo[bar][]" value="qux">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.writers = new Backbone.Syphon.InputWriterSet();
      this.writers.register('checkbox', function($el, value) {
        if (_.include(value, $el.val())){
          $el.prop('checked', true);
        }
      });

      this.data = {
        foo: {
          bar: ['baz', 'qux']
        }
      };

      this.result = Backbone.Syphon.deserialize(this.view, this.data, {
        inputWriters: this.writers
      });

      this.chk = this.view.$('[name="foo[bar][]"][value="baz"]');
    });

    it('should select the first checkbox', function() {
      expect(this.chk).to.be.checked;
    });

    it('should select the second checkbox', function() {
      expect(this.chk).to.be.checked;
    });
  });

  describe('when the view has nested naming with a . and using a custom keyJoiner', function() {
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

      this.keyJoiner = Backbone.Syphon.KeyJoiner;

      Backbone.Syphon.KeyJoiner = function(parentKey, childKey) {
        return [parentKey, childKey].join('.');
      };

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.deserialize(this.view, {
        widget: 'wombat',
        foo: {
          bar: 'baz',
          baz: {
            quux: 'qux'
          }
        }
      });
    });

    afterEach(function() {
      Backbone.Syphon.KeyJoiner = this.keyJoiner;
    });

    it('should set root values', function() {
      expect(this.view.$('[name="widget"]')).to.have.value('wombat');
    });

    it('should set first nested value', function() {
      expect(this.view.$('[name="foo.bar"]')).to.have.value('baz');
    });

    it('should set sibling nested value', function() {
      expect(this.view.$('[name="foo.baz.quux"]')).to.have.value('qux');
    });
  });
});
