describe('override the list of fields to include or ignore', function() {
  var View;

  beforeEach(function() {
    View = Backbone.View.extend({
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
    var result;

    beforeEach(function() {
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        include: ['a', 'b']
      });
    });

    it('should include the specified fields', function() {
      expect(result).to.have.ownProperty('a');
      expect(result).to.have.ownProperty('b');
    });

    it('should not include other fields', function() {
      expect(result).not.to.have.ownProperty('c');
      expect(result).not.to.have.ownProperty('d');
      expect(result).not.to.have.ownProperty('e');
    });
  });

  describe('when including a field that is an ignored type', function() {
    var result;

    beforeEach(function() {
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        include: ['e']
      });
    });

    it('should include the specified field', function() {
      expect(result).to.have.ownProperty('e');
    });
  });

  describe('when specifying fields to exclude', function() {
    var result;

    beforeEach(function() {
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        exclude: ['a', 'b']
      });
    });

    it('should ignore the specified fields', function() {
      expect(result).not.to.have.ownProperty('a');
      expect(result).not.to.have.ownProperty('b');
    });

    it('should include all other fields', function() {
      expect(result).to.have.ownProperty('c');
      expect(result).to.have.ownProperty('d');
    });
  });

  describe('when specifying fields to include that have also been excluded', function() {
    var result;

    beforeEach(function() {
      var view = new View();
      view.render();

      result = Backbone.Syphon.serialize(view, {
        include: ['a', 'b'],
        exclude: ['a', 'b']
      });
    });

    it('should include the specified fields', function() {
      expect(result).to.have.ownProperty('a');
      expect(result).to.have.ownProperty('b');
    });
  });
});
