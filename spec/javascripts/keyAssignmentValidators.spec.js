describe('key assignment validators', function() {
  describe('when specifying key assignment validators in the options for serialize', function() {
    beforeEach(function() {
      this.View = Backbone.View.extend({
        render: function() {
          this.$el.html(
            '<form>' +
              '<input data-stuff="bar" name="bar" value="a">' +
              '<input data-stuff="foo" name="foo" value="b">' +
            '</form>'
          );
        }
      });

      this.validators = new Backbone.Syphon.KeyAssignmentValidatorSet();
      this.validators.registerDefault(function($el) {
        return $el.data('stuff') === 'bar';
      });

      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        keyAssignmentValidators: this.validators
      });
    });

    it('should use the specified validators to include the right field', function() {
      expect(this.result).to.have.ownProperty('bar');
    });

    it('should use the specified validators to exclude the right field', function() {
      expect(this.result).not.to.have.ownProperty('foo');
    });
  });
});
