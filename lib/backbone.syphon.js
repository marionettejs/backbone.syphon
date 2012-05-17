// Backbone.Syphon, v0.1.1
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/derickbailey/backbone.syphon

Backbone.Syphon = (function(Backbone, $, _){
  var Syphon = {};

  // Syphon
  // ------

  // Get a JSON object that represents
  // all of the form inputs, in this view
  Syphon.serialize = function(view){
    var data = {};

    var elements = getElements(view);

    _.each(elements, function(el){
      var $el = $(el);
      var inputReader = Syphon.InputReaders.get($el);
      var value = inputReader($el);

      data[el.id] = value;
    });

    return data;
  };

  // Input Readers
  // -------------

  Syphon.InputReaders = {
    readers: {},

    // Retrieve the correct input reader based
    // on the type of the element that is passed
    // in as the `$el` parameter. If no reader is
    // found for the specific input type, returns
    // a default input reader.
    get: function($el){
      var type = this.getElementType($el); 
      var reader = this.readers[type];

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
      this.readers[type] = reader;
    },

    // Registers the default input reader that will
    // be returned when no input reader is found for
    // the specific type requested.
    registerDefault: function(reader){
      this.readers["default"] = reader;
    },

    // Determine what type of element this is. It
    // will either return the `type` attribute of
    // an `<input>` element, or the `tagName` of
    // the element when the element is not an `<input>`.
    getElementType: function($el){
      var typeAttr;
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
      
      return type.toLowerCase();
    }
  };

  // Built-in Input Readers
  // ---------------------
  
  // The default reader
  Syphon.InputReaders.registerDefault(function($el){
    return $el.val();
  });
  
  // Checkbox reader, returning a boolean value for
  // whether or not the checkbox is checked.
  Syphon.InputReaders.register("checkbox", function($el){
    var checked = $el.prop("checked");
    return checked;
  });

  // Retrieve all of the form inputs
  // from the view
  var getElements = function(view){
    var form = view.$("form")[0];
    return form.elements;
  };

  return Syphon;
})(Backbone, jQuery, _);
