describe('serializing a form', function() {
  describe('when serializing a text input', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" name="foo" value="bar">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should return an object with a key from the text input name', function() {
      expect(this.result).to.have.have.ownProperty('foo');
    });

    it('should have the input\'s value', function() {
      expect(this.result.foo).to.equal('bar');
    });
  });

  describe('when serializing a input with no name', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="text" value="bar">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should not serialize the value to the target object', function() {
      expect(this.result).to.be.ok;
    });
  });

  describe('when serializing a textarea', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<textarea name="foo">bar</textarea>' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should have the textarea\'s value', function() {
      expect(this.result.foo).to.equal('bar');
    });
  });

  describe('when serializing a select box', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should have the textarea\'s value', function() {
      expect(this.result.foo).to.equal('bar');
    });
  });

  describe('when serializing a checkbox', function() {
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

    describe('and the checkbox is checked', function() {
      beforeEach(function() {
        this.view = new this.View();
        this.view.render();
        this.view.$('#the-checkbox').prop('checked', true);

        this.result = Backbone.Syphon.serialize(this.view);
      });

      it('should return an object with a value of true', function() {
        expect(this.result.chk).to.be.true;
      });
    });

    describe('and the checkbox is not checked', function() {
      beforeEach(function() {
        this.view = new this.View();
        this.view.render();

        this.result = Backbone.Syphon.serialize(this.view);
      });

      it('should return an object with a value of false', function() {
        expect(this.result.chk).to.be.false;
      });
    });
  });

  describe('when serializing a button', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<button name="btn" value="foo">foo</button>' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should not have the button\'s value', function() {
      expect(this.result.hasOwnProperty('btn')).to.be.false;
    });
  });

  describe('when serializing an input with type of "submit"', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="submit" name="btn" value="foo" text="Foo">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should not have the button\'s value', function() {
      expect(this.result.hasOwnProperty('btn')).to.be.false;
    });
  });

  describe('when serializing an input with type of "reset"', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input type="reset" name="btn" value="foo" text="Foo">' +
            '</form>'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should not have the button\'s value', function() {
      expect(this.result.hasOwnProperty('btn')).to.be.false;
    });
  });

  describe('when serializing a radio button group', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
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

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('should only return the value of the selected radio button', function() {
      expect(this.result.foo).to.equal('bar');
    });
  });

  describe('when the view is actually a form', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        tagName: 'form',
        render: function() {
          this.$el.html(
            '<input type="text" name="foo" value="bar">'
          );
        }
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view);
    });

    it('retrieves the inputs\' values', function() {
      expect(this.result.foo).to.equal('bar');
    });
  });

  describe('when given a form element instead of a view', function() {
    beforeEach(function() {
      this.form = $(
        '<form>' +
          '<input type="text" name="foo" value="bar">' +
        '</form>'
      )[0];

      this.result = Backbone.Syphon.serialize(this.form);
    });

    it('retrieves the inputs\' values', function() {
      expect(this.result.foo).to.equal('bar');
    });
  });
});
