// Input Writers
// -------------

// Input Writers are used to insert a value from an
// object into an input element.
Backbone.Syphon.InputWriterSet = Backbone.Syphon.TypeRegistry.extend();

// Built-in Input Writers
Backbone.Syphon.InputWriters = new Backbone.Syphon.InputWriterSet();

// The default input writer, which sets an input
// element's "value"
Backbone.Syphon.InputWriters.registerDefault(function($el, value){
  $el.val(value);
});

// Checkbox writer, set whether or not the checkbox is checked
// depending on the boolean value.
Backbone.Syphon.InputWriters.register("checkbox", function($el, value){
  $el.prop("checked", value);
});

// Radio button writer, set whether or not the radio button is
// checked.  The button should only be checked if it's value
// equals the given value.
Backbone.Syphon.InputWriters.register("radio", function($el, value){
  $el.prop("checked", $el.val() === value);
});