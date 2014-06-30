describe('override the list of fields to include or ignore', function() {
  beforeEach(function() {
    this.View = Backbone.View.extend({
      render: function() {
        this.$el.html(
          '<form>' +
            '<input name="a">' +
            '<input name="b">' +
            '<input name="c">' +
            '<input name="d">' +
            '<button name="e">' +
          '</form>'
        );
      }
    });
  });

  describe('when specifying which fields to include', function() {
    beforeEach(function() {
      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        include: ['a', 'b']
      });
    });

    it('should include the specified fields', function() {
      expect(this.result).to.have.ownProperty('a');
      expect(this.result).to.have.ownProperty('b');
    });

    it('should not include other fields', function() {
      expect(this.result).not.to.have.ownProperty('c');
      expect(this.result).not.to.have.ownProperty('d');
      expect(this.result).not.to.have.ownProperty('e');
    });
  });

  describe('when including a field that is an ignored type', function() {
    beforeEach(function() {
      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        include: ['e']
      });
    });

    it('should include the specified field', function() {
      expect(this.result).to.have.ownProperty('e');
    });
  });

  describe('when specifying fields to exclude', function() {
    beforeEach(function() {
      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        exclude: ['a', 'b']
      });
    });

    it('should ignore the specified fields', function() {
      expect(this.result).not.to.have.ownProperty('a');
      expect(this.result).not.to.have.ownProperty('b');
    });

    it('should include all other fields', function() {
      expect(this.result).to.have.ownProperty('c');
      expect(this.result).to.have.ownProperty('d');
    });
  });

  describe('when specifying fields to include that have also been excluded', function() {
    beforeEach(function() {
      this.view = new this.View();
      this.view.render();

      this.result = Backbone.Syphon.serialize(this.view, {
        include: ['a', 'b'],
        exclude: ['a', 'b']
      });
    });

    it('should include the specified fields', function() {
      expect(this.result).to.have.ownProperty('a');
      expect(this.result).to.have.ownProperty('b');
    });
  });
});
