# Backbone.Syphon API Documentation

The document is the primary source for the API that Syphon
exposes, and provides information on how to correctly override
and configure the behaviors of Syphon.

## Syphon.KeyExtractorSet (Key Extractors)

When a form is serialized, all of the input elements are 
passed through a "Key Extractor" based on the type of input.
Key extractors are used to generate the "key" in the
`{key: "value"}` object that is returned from the call
to `.serialize`.

### Default Key Extractor Set

Syphon comes with a default key extractor set in the
`Backbone.Syhpon.KeyExtractors` object. This extractor set
has one default extractor built in to it (see below).

You can replace the entire extractor set by creating a new
instance of `Backbone.Syphon.KeyExtractorSet` like this:

```js
MyExtractorSet = new Backbone.Syphon.KeyExtractorSet();
MyExtractorSet.registerDefault(function($el){
  return $el.prop("id");
});

Backbone.KeyExtractors = MyExtractorSet;
```

Under normal circumstances, you won't have to replace
the key extractor set as a whole, though. You can simply
register new extractors as needed (see below).

### Default Key Extractor: element "name"

The default key extractor uses the `name` attribute of the form's
input element as the key.

For example, an HTML form that looks like this:

```html
<form>
  <input name="foo" value="bar">
  <input type="checkbox" name="chk" checked>
</form>
```

will produce this result, when serialized:

```js
{
  foo: "bar",
  chk: true
}
```

### Changing The Default Key Extractor

If you want to change the default key extractor, you can
call `Syphon.KeyExtractors.registerDefault`. This method
takes a single parameter of a function. The function
receives a single parameter of a jQuery selector element -
the input element that needs to have its key extracted.

To change the default behavior from using "id" to using
"name" on input elements, use the following configuration:

```js
Backbone.Syphon.KeyExtractors.registerDefault(function($el){
  return $el.prop("id");
});
```

Now an HTML form that looks like this:

```html
<form>
  <input id="quux" value="bar">
  <input type="checkbox" id="thingy" checked>
</form>
```

will produce this result, when serialized:

```js
{
  quux: "bar",
  thingy: true
}
```

### Key Extractors For Specific Input Types

You can also register key extractors for specific input types.
This allows you to override the behavior for a specific type
while still using the default behavior for other types.

To register a key extractor for a specific type, use the
`Syphon.KeyExtractors.register` method. This method takes
two parameters: the input type, and the extractor function.

```js
Backbone.Syphon.KeyExtractors.register("text", function($el){
  return $el.data("foo");
});
```

This configuration will take the following form:

```html
<form>
  <input data-foo="thingy" value="that">
</form>
```

and produce:

```js
{
  thingy: "that"
}
```

## Syphon.InputReaderSet (Input Readers)

Input Readers are used to serialize a specific form input
element in to the value that is appended to the resulting
JavaScript object. In other words, Input Readers are responsible
for turning `<input value="foo">` in to the value "foo".

By default, there are two input readers that know how to
handle form elements: the `default` reader and the `checkbox`
reader. The default reader handles nearly every form of input using
jQuery's `val()` method. The checkbox reader, however, looks
for whether or not the checkbox is checked and returns a
boolean value.

### Default Input Reader Set

Syphon comes with a default input reader set in the
`Backbone.Syhpon.InputReaders` object. This input reader set
has a few default input readers built in (see below).

You can replace the entire input reader set by creating a new
instance of `Backbone.Syphon.InputReaderSet` like this:

```js
MyReaderSet = new Backbone.Syphon.InputReaderSet();
MyReaderSet.registerDefault(function($el){
  return $el.val();
});

Backbone.InputReaders = MyReaderSet;
```

Under normal circumstances, you won't have to create your
own input reader set, though. You can register and remove
input readers as needed (see below) using the default
input reader set.

### Register Your Own Input Reader

You can register your own input readers, allowing you
to change how the data is read. To do this register
a callback function to an input type.

```js
Backbone.Syphon.InputReaders.register('radio', function(el){
  return el.val();
});
```

The input type that you specify is either the `type` attribute
of an input element, or the tag name of a non-input element (see
next section for more information).

The callback function receives one parameter: a jQuery selector
object that is the form element. You must return a value
from the callback function and this value is used as the
value in the final JavaScript object returne from the call
to serialize the form.

## Syphon.InputWriterSet (Input Writers)

Input Writers are used to deserialize an object's values in to
a form input elements. In other words, Input Writers are responsible
for turning `{foo: "bar"}` in to the value "bar" for `<input value="foo">`.

By default, there are three input writers that know how to
handle form elements: 

* the `default` writer
* the `checkbox` writer
* the `radio` writer 

The default reader handles nearly 
every form of input using jQuery's `val()` method. The checkbox reader, 
sets whether or not the checkbox is checked, and the radio writer will
select the correct radio button in a radio button group.

### Default Input Writer Set

Syphon comes with a default input writer set in the
`Backbone.Syhpon.InputWriters` object. This input writer set
has a few default input writers built in (see above).

You can replace the entire input writer set by creating a new
instance of `Backbone.Syphon.InputWriterSet` like this:

```js
MyWriterSet = new Backbone.Syphon.InputWriterSet();
MyWriterSet.registerDefault(function($el, value){
  $el.val(value);
});

Backbone.InputWriters = MyWriterSet;
```

Under normal circumstances, you won't have to create your
own input writer set, though. You can register and remove
input writers as needed using the default
input writer set.

### Register Your Own Input Writer

You can register your own input writers, allowing you
to change how the data is written to the form. To do this register
a callback function to an input type.

```js
Backbone.Syphon.InputReaders.register('radio', function(el, value){
  el.val(value);
});
```

The input type that you specify is either the `type` attribute
of an input element, or the tag name of a non-input element (see
next section for more information).

The callback function receives two parameter: 

* a jQuery selector object that is the form element
* the value to populate in to the element

You should set the value on the element, based on the type of the
element and based on whether or not the value should be set for that
specific element. For example, in selecting a radio button from a group,
you should only select the one that has the correct value:

```js
Backbone.Syphon.InputWriters.register("radio", function($el, value){
  $el.prop("checked", $el.val() === value);
});
```

## Syphon.KeyAssignmentValidatorSet (Validating Key / Value Assignment)

Key Assignment Validators are used to determine whether or not a
key should be assigned to a value, after the key and value have been
extracted from the element. This is the last opportunity to prevent
bad data from getting serialized to your object.

The most common use of this is to ensure radio button groups are only
serialized by the one radio button that is selected, within the group. This
behavior is built in by default (see below).

### Assigning Your Own Validator

You can assign your own validator against an input type, like this:

```js
Backbone.Syphon.KeyAssignmentValidators.registerDefault(function($el, key, value){
  // By default, everything is valid
  return true;
});

Backbone.Syphon.KeyAssignmentValidators.register("checkbox", function($el, key, value){
  var isValid = true; 

  // check the $el, the key and the value to make sure it's valid
  // and assign isValid appropriately

  return isValid;
});
```

The first parameter is the current input element that is being validated. The 
second parameter is the key that was generated by the Key Extractor, and the
third parameter is the value that was generated by the Value Reader. You must
return a boolean (or truthy) value from the callback.

Return values of `true` or truthy will be valid and the assignment will occur. Return values
that are `false` or falsey will not be valid and the assignment will not occur.

### Assign A Key Assignment Validation Set

You can assign your own Key Validation Set by creating an instance of
`Syphon.KeyAssignmentValidatorSet` and assigning it to `Backbone.Syphon.KeyAssignmentValidators`

```js
MyValidators = new Backbone.Syphon.KeyAssignmentValidatorSet();
// ... register validators

Backbone.Syphon.KeyAssignmentValidators = MyValidators;
```

Under normal circumstances, you won't need to assign a validation set like this. You'll
just register and remove validations as needed.

### Default Key Assignment Validators

There are two Key Assignment Validators built in to Syphon:

* default: everything is valid
* radio: only radio buttons that are selected are valid

## Handling Non-"input" Elements

You can register an Input Reader, Key Extractor, or Key
Assignment Validator for a non-`<input>` element by
specifying the element's tag name.

For example, if you want to handle a `<textarea>` input in some
special way, you can register a reader like this:

```js
Backbone.Syphon.InputReaders.register("textarea", function(el){
  var value;

  // do something special to get the value you want, 
  // from the text area input

  return value;
});
```

This also works for key extractors:

```js
Backbone.Syphon.KeyExtractors.register("textarea", function(el){
  return el.prop("name");
});
```

