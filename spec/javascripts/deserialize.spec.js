describe('deserializing an object into a form', function() {
  describe('when deserializing into a text input', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="foo">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: 'bar' });
      result = view.$('input[name=foo]').val();
    });

    it('should set the input\'s value to the corresponding value in the given object', function() {
      expect(result).to.equal('bar');
    });
  });

  describe('when deserializing into a textarea', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<textarea name="foo"></textarea>' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: 'bar' });
      result = view.$('textarea[name=foo]').val();
    });

    it('should set the input\'s value to the corresponding value in the given object', function() {
      expect(result).to.equal('bar');
    });
  });

  describe('when deserializing into a select box', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<select name="foo">' +
                '<option value="baz">baz</option>' +
                '<option value="bar">bar</option>' +
              '</select>' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: 'bar' });
      result = view.$('select').val();
    });

    it('should select the option corresponding to the value in the given object', function() {
      expect(result).to.equal('bar');
    });
  });

  describe('when deserializing into a checkbox', function() {
    var View;

    beforeEach(function() {
      View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="checkbox" id="the-checkbox" name="chk">' +
            '</form>'
          );
        }
      });
    });

    describe('and the corresponding value in the given object is true', function() {
      var view, result;

      beforeEach(function() {
        view = new View();
        view.render();

        Backbone.Syphon.deserialize(view, { chk: true });
        result = view.$('#the-checkbox').prop('checked');
      });

      it('should check the checkbox', function() {
        expect(result).to.be.true;
      });
    });

    describe('and the corresponding value in the given object is false', function() {
      var view, result;

      beforeEach(function() {
        view = new View();
        view.render();
        view.$('#the-checkbox').prop('checked', true);

        Backbone.Syphon.deserialize(view, { chk: false });
        result = view.$('#the-checkbox').prop('checked');
      });

      it('should uncheck the checkbox', function() {
        expect(result).to.be.false;
      });
    });
  });

  describe('when deserializing into a button', function() {
    var view, value, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<button name="btn">foo</button>' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();
      value = view.$('button[name=btn]').val();

      Backbone.Syphon.deserialize(view, { btn: 'foo' });
      result = view.$('button[name=btn]').val();
    });

    it('the button value should remain unchanged', function() {
      expect(result).to.equal(value);
    });
  });

  describe('when deserializing into an input with type of "submit"', function() {
    var view, value, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="submit" name="btn" text="Foo">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();
      value = view.$('input[name=btn]').val();

      Backbone.Syphon.deserialize(view, { btn: 'foo' });
      result = view.$('input[name=btn]').val();
    });

    it('the input value should remain unchanged', function() {
      expect(result).to.equal(value);
    });
  });

  describe('when deserializing into an input with type of "reset"', function() {
    var view, value, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="reset" name="btn" text="Foo">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();
      value = view.$('input[name=btn]').val();

      Backbone.Syphon.deserialize(view, { btn: 'foo' });
      result = view.$('input[name=btn]').val();
    });

    it('the input should not have a value', function() {
      expect(result).to.equal(value);
    });
  });

  describe('when deserializing into a radio button group', function() {
    var view, checked;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="radio" name="foo" value="foo">' +
              '<input type="radio" name="foo" value="bar">' +
              '<input type="radio" name="foo" value="baz">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: 'bar' });
      checked = view.$('input[name=foo][value=bar]').prop('checked');
    });

    it('should select the corresponding radio button', function() {
      expect(checked).to.be.true;
    });
  });

  describe('when deserializing into a radio button group (when value is a number)', function() {
    var view, checked;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="radio" name="foo" value="1">' +
              '<input type="radio" name="foo" value="2">' +
              '<input type="radio" name="foo" value="3">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      Backbone.Syphon.deserialize(view, { foo: 2 });
      checked = view.$('input[name=foo][value=2]').prop('checked');
    });

    it('should select the corresponding radio button', function() {
      expect(checked).to.be.true;
    });
  });

  describe('when given a form element instead of a view', function() {
    var form, result;

    beforeEach(function() {
      form = $(
        '<form>' +
          '<input type="text" name="foo" value="bar">' +
        '</form>'
      )[0];

      Backbone.Syphon.deserialize(form, { foo: 'bar' });
      result = $(form).find('input[name=foo]').val();
    });

    it('should set the input\'s value to the corresponding value in the given object', function() {
      expect(result).to.equal('bar');
    });
  });
});
