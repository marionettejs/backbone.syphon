// Input Readers
// -------------

// Input Readers are used to extract the value from
// an input element, for the serialized object result
var InputReaderSet = Syphon.InputReaderSet = TypeRegistry.extend();

// Built-in Input Readers
var InputReaders = Syphon.InputReaders = new InputReaderSet();

// The default input reader, which uses an input
// element's "value"
InputReaders.registerDefault(function($el){
  return $el.val();
});

// Checkbox reader, returning a boolean value for
// whether or not the checkbox is checked.
InputReaders.register("checkbox", function($el){
  return $el.prop("checked");
});
