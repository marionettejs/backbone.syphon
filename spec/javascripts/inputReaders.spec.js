describe("input readers", function(){
  
  describe("when registering an input reader for an input with a type attribute", function(){
    var reader = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputReaders.register("foo", reader);
    });

    afterEach(function(){
      Backbone.Syphon.InputReaders.register("foo");
    });

    it("should be able to retrieve the input reader for that type", function(){
      var found = Backbone.Syphon.InputReaders.get("foo");
      expect(found).toBe(reader);
    });
  });

  describe("when retrieving a reader for an input with no type attribute", function(){
    var reader = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputReaders.register("text", reader);
    });

    afterEach(function(){
      Backbone.Syphon.InputReaders.register("text");
    });

    it("should retrieve the registered 'text' reader", function(){
      var found = Backbone.Syphon.InputReaders.get("text");
      expect(found).toBe(reader);
    });
  });

  describe("when registering an input reader for an input element that does not have a 'type' attribute", function(){
    var reader = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputReaders.register("textarea", reader);
    });

    afterEach(function(){
      Backbone.Syphon.InputReaders.register("textarea");
    });

    it("should be able to retrieve the input reader for that type", function(){
      var found = Backbone.Syphon.InputReaders.get("textarea");
      expect(found).toBe(reader);
    });
  });

  describe("when unregistering an input reader", function(){
    var reader = function(){};

    beforeEach(function(){
      Backbone.Syphon.InputReaders.register("foo", reader);

      Backbone.Syphon.InputReaders.unregister("foo");
    });

    it("should no longer find the input reader for that type", function(){
      var found = Backbone.Syphon.InputReaders.get("foo");
      expect(found).not.toBe(reader);
    });
  });


});
