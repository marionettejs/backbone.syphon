// Backbone.Syphon, v0.1.0
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

    get: function($el){
      var type = $el.attr("type");
      var reader = this.readers[type];

      if (!reader){
        reader = this.readers["default"];
      }

      return reader;
    },

    register: function(type, reader){
      this.readers[type] = reader;
    },

    registerDefault: function(reader){
      this.readers["default"] = reader;
    }
  };

  // Default input readers
  // ---------------------
  
  Syphon.InputReaders.registerDefault(function($el){
    return $el.val();
  });
  
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
