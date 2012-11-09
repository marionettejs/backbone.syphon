Backbone.Syphon = (function(Backbone, $, _){
  var Syphon = {};

  // Ignore Element Types
  // --------------------

  // Tell Syphon to ignore all elements of these types. You can
  // push new types to ignore directly in to this array.
  Syphon.ignoredTypes = ["button", "submit", "reset", "fieldset"];

  // Syphon
  // ------

  // Get a JSON object that represents
  // all of the form inputs, in this view.
  // Alternately, pass a form element directly
  // in place of the view.
  Syphon.serialize = function(view, options){
    var data = {};

    // Build the configuration
    var config = buildConfig(options);

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
        var keychain = config.keySplitter(key);
        data = assignKeyValue(data, keychain, value);
      }
    });

    // Done; send back the results.
    return data;
  };
  
  // Use the given JSON object to populate
  // all of the form inputs, in this view.
  // Alternately, pass a form element directly
  // in place of the view.
  Syphon.deserialize = function(view, data, options){
    // Build the configuration
    var config = buildConfig(options);

    // Get all of the elements to process
    var elements = getInputElements(view, config);

    // Flatten the data structure that we are deserializing
    var flattenedData = flattenData(config, data);

    // Process all of the elements
    _.each(elements, function(el){
      var $el = $(el);
      var type = getElementType($el); 

      // Get the key for the input
      var keyExtractor = config.keyExtractors.get(type);
      var key = keyExtractor($el);

      // Get the input writer and the value to write
      var inputWriter = config.inputWriters.get(type);
      var value = flattenedData[key];

      // Write the value to the input
      inputWriter($el, value);
    });
  };

  // Helpers
  // -------

  // Retrieve all of the form inputs
  // from the form
  var getInputElements = function(view, config){
    var form = getForm(view);
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
  
  // If a form element is given, just return it. 
  // Otherwise, get the form element from the view.
  var getForm = function(viewOrForm){
    if (_.isUndefined(viewOrForm.$el) && viewOrForm.tagName.toLowerCase() === 'form'){
      return viewOrForm;
    } else {
      return viewOrForm.$el.is("form") ? viewOrForm.el : viewOrForm.$("form")[0];
    }
  };

  // Build a configuration object and initialize
  // default values.
  var buildConfig = function(options){
    var config = _.clone(options) || {};
    
    config.ignoredTypes = _.clone(Syphon.ignoredTypes);
    config.inputReaders = config.inputReaders || Syphon.InputReaders;
    config.inputWriters = config.inputWriters || Syphon.InputWriters;
    config.keyExtractors = config.keyExtractors || Syphon.KeyExtractors;
    config.keySplitter = config.keySplitter || Syphon.KeySplitter;
    config.keyJoiner = config.keyJoiner || Syphon.KeyJoiner;
    config.keyAssignmentValidators = config.keyAssignmentValidators || Syphon.KeyAssignmentValidators;
    
    return config;
  };

  // Assigns `value` to a parsed JSON key. 
  //
  // The first parameter is the object which will be
  // modified to store the key/value pair.
  //
  // The second parameter accepts an array of keys as a 
  // string with an option array containing a 
  // single string as the last option.
  //
  // The third parameter is the value to be assigned.
  //
  // Examples:
  //
  // `["foo", "bar", "baz"] => {foo: {bar: {baz: "value"}}}`
  // 
  // `["foo", "bar", ["baz"]] => {foo: {bar: {baz: ["value"]}}}`
  // 
  // When the final value is an array with a string, the key
  // becomes an array, and values are pushed in to the array,
  // allowing multiple fields with the same name to be 
  // assigned to the array.
  var assignKeyValue = function(obj, keychain, value) {
    if (!keychain){ return obj; }

    var key = keychain.shift();

    // build the current object we need to store data
    if (!obj[key]){
      obj[key] = _.isArray(key) ? [] : {};
    }

    // if it's the last key in the chain, assign the value directly
    if (keychain.length === 0){
      if (_.isArray(obj[key])){
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    }

    // recursive parsing of the array, depth-first
    if (keychain.length > 0){
      assignKeyValue(obj[key], keychain, value);
    }
    
    return obj;
  };

  // Flatten the data structure in to nested strings, using the
  // provided `KeyJoiner` function.
  //
  // Example:
  //
  // This input:
  //
  // ```js
  // {
  //   widget: "wombat",
  //   foo: {
  //     bar: "baz",
  //     baz: {
  //       quux: "qux"
  //     },
  //     quux: ["foo", "bar"]
  //   }
  // }
  // ```
  //
  // With a KeyJoiner that uses [ ] square brackets, 
  // should produce this output:
  //
  // ```js
  // {
  //  "widget": "wombat",
  //  "foo[bar]": "baz",
  //  "foo[baz][quux]": "qux",
  //  "foo[quux]": ["foo", "bar"]
  // }
  // ```
  var flattenData = function(config, data, parentKey){
    var flatData = {};

    _.each(data, function(value, keyName){
      var hash = {};

      // If there is a parent key, join it with
      // the current, child key.
      if (parentKey){
        keyName = config.keyJoiner(parentKey, keyName);
      }

      if (_.isArray(value)){
        keyName += "[]";
        hash[keyName] = value;
      } else if (_.isObject(value)){
        hash = flattenData(config, value, keyName);
      } else {
        hash[keyName] = value;
      }

      // Store the resulting key/value pairs in the
      // final flattened data object
      _.extend(flatData, hash);
    });

    return flatData;
  };

  return Syphon;
})(Backbone, jQuery, _);

//= backbone.syphon.typeregistry.js

//= backbone.syphon.keyextractors.js

//= backbone.syphon.inputreaders.js

//= backbone.syphon.inputwriters.js

//= backbone.syphon.keyassignmentvalidators.js

//= backbone.syphon.keysplitter.js

//= backbone.syphon.keyjoiner.js
