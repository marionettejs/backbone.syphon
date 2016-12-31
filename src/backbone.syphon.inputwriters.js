// Input Writers
// -------------

// Input Writers are used to insert a value from an
// object into an input element.
var InputWriterSet = Syphon.InputWriterSet = TypeRegistry.extend();

// Built-in Input Writers
var InputWriters = Syphon.InputWriters = new InputWriterSet();

// The default input writer, which sets an input
// element's "value"
InputWriters.registerDefault(function($el, value) {
  $el.val(value);
});

// Checkbox writer, set whether or not the checkbox is checked
// depending on the boolean value.
InputWriters.register('checkbox', function($el, value) {
  if (value === null) {
    $el.prop('indeterminate', true);
  } else {
    $el.prop('checked', value);
  }
});

// Radio button writer, set whether or not the radio button is
// checked.  The button should only be checked if it's value
// equals the given value.
InputWriters.register('radio', function($el, value) {
  var checked = _.isUndefined(value) ? false : $el.val() === value.toString();
  $el.prop('checked', checked);
});
