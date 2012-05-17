describe("input readers", function(){
  
  describe("when registering an input reader for an input type", function(){
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
