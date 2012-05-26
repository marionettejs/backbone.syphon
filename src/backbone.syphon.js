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
  Syphon.serialize = function(view, options){
    var data = {};

    // Build the configuration
    var config = _.clone(options) || {};
    config.ignoredTypes = _.clone(Syphon.ignoredTypes);
    config.inputReaders = config.inputReaders || Syphon.InputReaders;
    config.keyExtractors = config.keyExtractors || Syphon.KeyExtractors;
    config.keyAssignmentValidators = config.keyAssignmentValidators || Syphon.KeyAssignmentValidators;

    // Get all of the elements to process
    var elements = getInputElements(view, config);

    // Process all of the elements
    _.each(elements, function(el){
      var $el = $(el);
      var type = getElementType($el); 

      // Get the key for the input
      var keyExtractor = config.keyExtractors.get(type);
      var key = keyExtractor($el);

      // Get the value for the input
      var inputReader = config.inputReaders.get(type);
      var value = inputReader($el);

      // Get the key assignment validator and make sure
      // it's valid before assigning the value to the key
      var validKeyAssignment = config.keyAssignmentValidators.get(type);
      if (validKeyAssignment($el, key, value)){
        data[key] = value;
      }
    });

    // Done; send back the results.
    return data;
  };
  
  // Use the given JSON object to populate
  // all of the form inputs, in this view
  Syphon.deserialize = function(view, data, options){
    // Build the configuration
    var config = _.clone(options) || {};
    config.ignoredTypes = _.clone(Syphon.ignoredTypes);
    config.inputWriters = config.inputWriters || Syphon.InputWriters;
    config.keyExtractors = config.keyExtractors || Syphon.KeyExtractors;

    // Get all of the elements to process
    var elements = getInputElements(view, config);

    // Process all of the elements
    _.each(elements, function(el){
      var $el = $(el);
      var type = getElementType($el); 

      // Get the key for the input
      var keyExtractor = config.keyExtractors.get(type);
      var key = keyExtractor($el);

      // Write value to input
      var inputWriter = config.inputWriters.get(type);
      inputWriter($el, data[key]);
    });
  };

  // Helpers
  // -------

  // Retrieve all of the form inputs
  // from the view
  var getInputElements = function(view, config){
    var form = view.$("form")[0];
    var elements = form.elements;

    elements = _.reject(elements, function(el){
      var reject;
      var type = getElementType(el);
      var extractor = config.keyExtractors.get(type);
      var identifier = extractor($(el));
     
      var foundInIgnored = _.include(config.ignoredTypes, type);
      var foundInInclude = _.include(config.include, identifier);
      var foundInExclude = _.include(config.exclude, identifier);

      if (foundInInclude){
        reject = false;
      } else {
        if (config.include){
          reject = true;
        } else {
          reject = (foundInExclude || foundInIgnored);
        }
      }

      return reject;
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

//= backbone.syphon.typeregistry.js

//= backbone.syphon.keyextractors.js

//= backbone.syphon.inputreaders.js

//= backbone.syphon.inputwriters.js

//= backbone.syphon.keyassignmentvalidators.js

