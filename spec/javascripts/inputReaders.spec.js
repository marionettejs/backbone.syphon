describe("input readers", function(){
  
  describe("when registering an input reader for an input with a type attribute", function(){
    var el;
    var reader = function(){};

    beforeEach(function(){
      el = $("<input type='foo'>");
      Backbone.Syphon.InputReaders.register("foo", reader);
    });

    it("should be able to retrieve the input reader for that type", function(){
      var found = Backbone.Syphon.InputReaders.get(el);
      expect(found).toBe(reader);
    });
  });

  describe("when retrieving a reader for an input with no type attribute", function(){
    var el;
    var reader = function(){};

    beforeEach(function(){
      el = $("<input>");
      Backbone.Syphon.InputReaders.register("text", reader);
    });

    it("should retrieve the registered 'text' reader", function(){
      var found = Backbone.Syphon.InputReaders.get(el);
      expect(found).toBe(reader);
    });
  });

  describe("when registering an input reader for an input element that does not have a 'type' attribute", function(){
    var el;
    var reader = function(){};

    beforeEach(function(){
      el = $("<textarea></textarea>");
      Backbone.Syphon.InputReaders.register("textarea", reader);
    });

    it("should be able to retrieve the input reader for that type", function(){
      var found = Backbone.Syphon.InputReaders.get(el);
      expect(found).toBe(reader);
    });
  });

});
