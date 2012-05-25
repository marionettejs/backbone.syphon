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

// Checkbox writer, returning a boolean value for
// whether or not the checkbox is checked.
Backbone.Syphon.InputWriters.register("checkbox", function($el, value){
  $el.prop("checked", value);
});
