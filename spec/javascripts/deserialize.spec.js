describe('deserializing an object into a form', function() {
  describe('when deserializing into a text input', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="foo">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, { foo: 'bar' });
      this.result = this.view.$('input[name=foo]').val();
    });

    it('should set the input\'s value to the corresponding value in the given object', function() {
      expect(this.result).to.equal('bar');
    });
  });

  describe('when deserializing into a textarea', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<textarea name="foo"></textarea>' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, { foo: 'bar' });
      this.result = this.view.$('textarea[name=foo]').val();
    });

    it('should set the input\'s value to the corresponding value in the given object', function() {
      expect(this.result).to.equal('bar');
    });
  });

  describe('when deserializing into a select box', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, { foo: 'bar' });
      this.result = this.view.$('select').val();
    });

    it('should select the option corresponding to the value in the given object', function() {
      expect(this.result).to.equal('bar');
    });
  });

  describe('when deserializing into a checkbox', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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
      beforeEach(function() {
        this.view = new this.View();
        this.view.render();

        Backbone.Syphon.deserialize(this.view, { chk: true });
        this.result = this.view.$('#the-checkbox').prop('checked');
      });

      it('should check the checkbox', function() {
        expect(this.result).to.be.true;
      });
    });

    describe('and the corresponding value in the given object is false', function() {
      beforeEach(function() {
        this.view = new this.View();
        this.view.render();
        this.view.$('#the-checkbox').prop('checked', true);

        Backbone.Syphon.deserialize(this.view, { chk: false });
        this.result = this.view.$('#the-checkbox').prop('checked');
      });

      it('should uncheck the checkbox', function() {
        expect(this.result).to.be.false;
      });
    });
  });

  describe('when deserializing into a button', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<button name="btn">foo</button>' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();
      this.value = this.view.$('button[name=btn]').val();

      Backbone.Syphon.deserialize(this.view, { btn: 'foo' });
      this.result = this.view.$('button[name=btn]').val();
    });

    it('the button value should remain unchanged', function() {
      expect(this.result).to.equal(this.value);
    });
  });

  describe('when deserializing into an input with type of "submit"', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="submit" name="btn" text="Foo">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();
      this.value = this.view.$('input[name=btn]').val();

      Backbone.Syphon.deserialize(this.view, { btn: 'foo' });
      this.result = this.view.$('input[name=btn]').val();
    });

    it('the input value should remain unchanged', function() {
      expect(this.result).to.equal(this.value);
    });
  });

  describe('when deserializing into an input with type of "reset"', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="reset" name="btn" text="Foo">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();
      this.value = this.view.$('input[name=btn]').val();

      Backbone.Syphon.deserialize(this.view, { btn: 'foo' });
      this.result = this.view.$('input[name=btn]').val();
    });

    it('the input should not have a value', function() {
      expect(this.result).to.equal(this.value);
    });
  });

  describe('when deserializing into a radio button group', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, { foo: 'bar' });
      this.checked = this.view.$('input[name=foo][value=bar]').prop('checked');
    });

    it('should select the corresponding radio button', function() {
      expect(this.checked).to.be.true;
    });
  });

  describe('when deserializing into a radio button group (when value is a number)', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      Backbone.Syphon.deserialize(this.view, { foo: 2 });
      this.checked = this.view.$('input[name=foo][value=2]').prop('checked');
    });

    it('should select the corresponding radio button', function() {
      expect(this.checked).to.be.true;
    });
  });

  describe('when given a form element instead of a view', function() {
    beforeEach(function() {
      this.form = $(
        '<form>' +
          '<input type="text" name="foo" value="bar">' +
        '</form>'
      )[0];

      Backbone.Syphon.deserialize(this.form, { foo: 'bar' });
      this.result = $(this.form).find('input[name=foo]').val();
    });

    it('should set the input\'s value to the corresponding value in the given object', function() {
      expect(this.result).to.equal('bar');
    });
  });
});
