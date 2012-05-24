Backbone.Syphon = (function(Backbone, $, _){
  var Syphon = {};

  // Ignore Element Types
  // --------------------

  // Tell Syphon to ignore all elements of these types. You can
  // push new types to ignore directly in to this array.
  Syphon.ignoredTypes = ["button", "submit", "reset"];

  // Syphon
  // ------

  // Get a JSON object that represents
  // all of the form inputs, in this view
  Syphon.serialize = function(view){
    var data = {};

    var elements = getInputElements(view, Syphon.ignoredTypes);

    _.each(elements, function(el){
      var $el = $(el);
      var type = getElementType($el); 

      var inputReader = Syphon.InputReaders.get(type);
      var value = inputReader($el);

      var keyExtractor = Syphon.KeyExtractors.get(type);
      var key = keyExtractor($el);

      data[key] = value;
    });

    return data;
  };

  // Input Readers
  // -------------
  
  // Input Readers are used to extract the value from
  // an input element, for the serialized object result
  Syphon.InputReaderSet = function(){
    this.readers = {};
  };

  _.extend(Syphon.InputReaderSet.prototype, {
    // Retrieve the correct input reader based
    // on the type of the element that is passed
    // in as the `$el` parameter. If no reader is
    // found for the specific input type, returns
    // a default input reader.
    get: function(type){
      var reader = this.readers[type.toLowerCase()];

      if (!reader){
        reader = this.readers["default"];
      }

      return reader;
    },

    // Register a new input reader, based on
    // an input element type. For example: "text", 
    // or "textarea". Note that the type can either
    // be a `type` attribute (`type="text"`) or the
    // elmement `tagName` (`<textarea>`).
    register: function(type, reader){
      this.readers[type.toLowerCase()] = reader;
    },

    // Registers the default input reader that will
    // be returned when no input reader is found for
    // the specific type requested.
    registerDefault: function(reader){
      this.readers["default"] = reader;
    },

    // Remove the Input Reader associated with this
    // input type.
    unregister: function(type){
      delete this.readers[type];
    }
  });

  // Key Extractors
  // --------------
  
  // Key extractors produce the "key" in `{key: "value"}`
  // pairs, when serializing.
  Syphon.KeyExtractorSet = function(){
    this.extractors = {};
  };

  _.extend(Syphon.KeyExtractorSet.prototype, {

    // Register a default extractor to use when no extractor
    // for the specific input type is found.
    registerDefault: function(extractor){
      this.extractors["default"] = extractor;
    },

    // Register an extractor for a specific input type, allowing that
    // input type to have it's key extracted in a specific way
    register: function(type, extractor){
      this.extractors[type] = extractor;
    },

    // Get an extractor for the specified input type. Returns
    // the "default" extractor if a specific one is not found.
    get: function(type){
      var extractor = this.extractors[type];

      if (!extractor){
        extractor = this.extractors["default"];
      }

      return extractor;
    }
  });

  // Built-in Key Extractors
  // -----------------------

  // The default extractor set
  Syphon.KeyExtractors = new Syphon.KeyExtractorSet();

  // The default key extractor, which uses the
  // input element's "id" attribute
  Syphon.KeyExtractors.registerDefault(function($el){
    return $el.prop("id");
  });

  // Built-in Input Readers
  // ----------------------
  
  // The default reader set
  Syphon.InputReaders = new Syphon.InputReaderSet();

  // The default input reader, which uses an input
  // element's "value"
  Syphon.InputReaders.registerDefault(function($el){
    return $el.val();
  });
  
  // Checkbox reader, returning a boolean value for
  // whether or not the checkbox is checked.
  Syphon.InputReaders.register("checkbox", function($el){
    var checked = $el.prop("checked");
    return checked;
  });

  // Helpers
  // -------

  // Retrieve all of the form inputs
  // from the view
  var getInputElements = function(view, ignoreTypes){
    var form = view.$("form")[0];
    var elements = form.elements;
    elements = _.reject(elements, function(el){
      var type = getElementType(el);
      var found = _.include(ignoreTypes, type);
      return found;
    });
    return elements;
  };

  // Determine what type of element this is. It
  // will either return the `type` attribute of
  // an `<input>` element, or the `tagName` of
  // the element when the element is not an `<input>`.
  var getElementType = function(el){
    var typeAttr;
    var $el = $(el);
    var tagName = $el[0].tagName;
    var type = tagName;

    if (tagName.toLowerCase() === "input"){
      typeAttr = $el.attr("type");
      if (typeAttr){
        type = typeAttr;
      } else {
        type = "text";
      }
    }
    
    // Always return the type as lowercase
    // so it can be matched to lowercase
    // type registrations.
    return type.toLowerCase();
  };

  return Syphon;
})(Backbone, jQuery, _);
