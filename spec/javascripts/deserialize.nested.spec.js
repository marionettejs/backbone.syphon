describe('deserializing nested key names', function() {
  describe('when the view has nested naming with []', function() {
    var View = Backbone.View.extend({
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

    var view;

    beforeEach(function() {
      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, {
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
      expect(view.$('[name="widget"]')).to.have.value('wombat');
    });

    it('should set first nested value', function() {
      expect(view.$('[name="foo[bar]"]')).to.have.value('baz');
    });

    it('should set sibling nested value', function() {
      expect(view.$('[name="foo[baz][qux]"]')).to.have.value('qux');
    });
  });

  describe('when the view has nested naming with [] and ends with [] for an array, on checkboxes', function() {
    var View = Backbone.View.extend({
      render: function() {
        this.$el.html(
          '<form>' +
            '<input type="checkbox" name="foo[bar][]" value="baz">' +
            '<input type="checkbox" name="foo[bar][]" value="qux">' +
          '</form>'
        );
      }
    });

    var view, result;

    beforeEach(function() {
      view = new View();
      view.render();

      var writers = new Backbone.Syphon.InputWriterSet();
      writers.register('checkbox', function($el, value) {
        if (_.include(value, $el.val())){
          $el.prop('checked', true);
        }
      });

      var data = {
        foo: {
          bar: ['baz', 'qux']
        }
      };

      result = Backbone.Syphon.deserialize(view, data, {
        inputWriters: writers
      });
    });

    it('should select the first checkbox', function() {
      var chk = view.$('[name="foo[bar][]"][value="baz"]');
      expect(chk).to.be.checked;
    });

    it('should select the second checkbox', function() {
      var chk = view.$('[name="foo[bar][]"][value="qux"]');
      expect(chk).to.be.checked;
    });
  });

  describe('when the view has nested naming with a . and using a custom keyJoiner', function() {
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

    var view, result;

    beforeEach(function() {
      this.keyJoiner = Backbone.Syphon.KeyJoiner;

      Backbone.Syphon.KeyJoiner = function(parentKey, childKey) {
        return [parentKey, childKey].join('.');
      };

      view = new View();
      view.render();

      result = Backbone.Syphon.deserialize(view,{
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
      expect(view.$('[name="widget"]')).to.have.value('wombat');
    });

    it('should set first nested value', function() {
      expect(view.$('[name="foo.bar"]')).to.have.value('baz');
    });

    it('should set sibling nested value', function() {
      expect(view.$('[name="foo.baz.quux"]')).to.have.value('qux');
    });
  });
});
