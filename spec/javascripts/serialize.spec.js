describe('serializing a form', function() {
  describe('when serializing a text input', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="foo" value="bar">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should return an object with a key from the text input name', function() {
      expect(result).to.have.have.ownProperty('foo');
    });

    it('should have the input\'s value', function() {
      expect(result.foo).to.equal('bar');
    });
  });

  describe('when serializing a input with no name', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" value="bar">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should not serialize the value to the target object', function() {
      expect(result).to.be.ok;
    });
  });

  describe('when serializing a textarea', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<textarea name="foo">bar</textarea>' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should have the textarea\'s value', function() {
      expect(result.foo).to.equal('bar');
    });
  });

  describe('when serializing a select box', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<select name="foo">' +
                '<option value="bar">bar</option>' +
              '</select>' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should have the textarea\'s value', function() {
      expect(result.foo).to.equal('bar');
    });
  });

  describe('when serializing a checkbox', function() {
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

    describe('and the checkbox is checked', function() {
      var view, result;

      beforeEach(function() {
        view = new View();
        view.render();
        view.$('#the-checkbox').prop('checked', true);

        result = Backbone.Syphon.serialize(view);
      });

      it('should return an object with a value of true', function() {
        expect(result.chk).to.be.true;
      });
    });

    describe('and the checkbox is not checked', function() {
      var view, result;

      beforeEach(function() {
        view = new View();
        view.render();

        result = Backbone.Syphon.serialize(view);
      });

      it('should return an object with a value of false', function() {
        expect(result.chk).to.be.false;
      });
    });
  });

  describe('when serializing a button', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<button name="btn" value="foo">foo</button>' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should not have the button\'s value', function() {
      expect(result.hasOwnProperty('btn')).to.be.false;
    });
  });

  describe('when serializing an input with type of "submit"', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="submit" name="btn" value="foo" text="Foo">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should not have the button\'s value', function() {
      expect(result.hasOwnProperty('btn')).to.be.false;
    });
  });

  describe('when serializing an input with type of "reset"', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="reset" name="btn" value="foo" text="Foo">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should not have the button\'s value', function() {
      expect(result.hasOwnProperty('btn')).to.be.false;
    });
  });

  describe('when serializing a radio button group', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="radio" name="foo" value="foo">' +
              '<input type="radio" name="foo" value="bar" checked>' +
              '<input type="radio" name="foo" value="baz">' +
            '</form>'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('should only return the value of the selected radio button', function() {
      expect(result.foo).to.equal('bar');
    });
  });

  describe('when the view is actually a form', function() {
    var view, result;

    beforeEach(function() {
      var View = Backbone.View.extend({
        tagName: 'form',
        render: function() {
          this.$el.html(
            '<input type="text" name="foo" value="bar">'
          );
        }
      });

      view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view);
    });

    it('retrieves the inputs\' values', function() {
      expect(result.foo).to.equal('bar');
    });
  });

  describe('when given a form element instead of a view', function() {
    var result;

    beforeEach(function() {
      var form = $(
        '<form>' +
          '<input type="text" name="foo" value="bar">' +
        '</form>'
      )[0];

      result = Backbone.Syphon.serialize(form);
    });

    it('retrieves the inputs\' values', function() {
      expect(result.foo).to.equal('bar');
    });
  });
});
