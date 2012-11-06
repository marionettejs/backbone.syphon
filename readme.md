Backbone.Syphon - serialize the forms in your
Backbone.Views into a JSON object for use with 
Backbone's models.

## Backbone.Syphon

Working with form elements in a Backbone view can become
very tedious very quickly. You will either end up writing
a lot of repetitive code to read values from the form,
or end up using a key-value-observer or data-binding
solution that automatically populates your model for you.
While these are valid options and I highly recommend
understanding how they work, there are times when these 
options are not the best choice for your application.

Backbone.Syphon aims to make it easy to serialize the
form inputs of a Backbone.View in to a simple JSON object
that contains all of the values from the form.

## Source Code And Downloads

You can download the raw source code from the "src" 
folder above, or grab one of the builds from the 
"lib" folder. 

To get the latest stable release, use these links 
which point to the 'master' branch's builds:

### Standard Builds

Development: [backbone.syphon.js](https://raw.github.com/derickbailey/backbone.syphon/master/lib/backbone.syphon.js)

Production: [backbone.syphon.min.js](https://raw.github.com/derickbailey/backbone.syphon/master/lib/backbone.syphon.min.js)

### AMD/RequireJS Builds

Development: [backbone.syphon.js](https://raw.github.com/derickbailey/backbone.syphon/master/lib/amd/backbone.syphon.js)

Production: [backbone.syphon.min.js](https://raw.github.com/derickbailey/backbone.syphon/master/lib/amd/backbone.syphon.min.js)

## Documentation

This readme file contains basic usage examples.

### Extensibility / API Documentation

If you need to modify the behaviors of Syphon, see the API document. It
contains the documentation for the core APIs that Syphon exposes, with
examples on how to change the behaviors of Syphon.

##### [View The API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md)

### Annotated Source Code

Syphon has annotated source code using the Docco tool to turn
comments in to documentation. This provides an in-depth look
at what each section of is doing.

##### [View The Annotated Source Code](http://derickbailey.github.com/backbone.syphon/docs/backbone.syphon.html)

## Basic Usage : Serialize

When the data from a form is needed, you can call the
`serialize` method of `Backbone.Syphon` to retrieve an
object literal that contains the data from your view's
form.

```js
Backbone.View.extend({
  events: {
    "submit form": "formSubmitted"
  },

  formSubmitted: function(e){
    e.preventDefault();

    var data = Backbone.Syphon.serialize(this);
    this.model.set(data);

    this.model.save();
  },

  render: function(){
    // build the view's form, here
  }
});
```

### Keys Retrieved By "name" Attribute

The default behavior for serializing fields is to use the field's "name"
attribute as the key in the serialized object.

```html
<form>
  <input name="a">
  <select name="b"></select>
  <textarea name="c"></textarea>
</form>
```

```js
Backbone.Syphon.serialize(view);

// will produce => 

{
  a: "",
  b: "",
  c: ""
}
```

For information on how to change this behavior, see the Key Extractors 
section of the 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

### Values Retrieved By jQuery `.val()` Call

The default behavior for serializing fields is to use jQuery's `.val()`
to get the value of the input element.

```html
<form>
  <input name="a" value="a-value">
  <textarea name="b">b-value</textarea>
</form>
```

```js
Backbone.Syphon.serialize(view);

// will produce => 

{
  a: "a-value",
  b: "b-value",
}
```

For information on how to change this behavior, see the Input Readers
section of the 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

### Checkboxes

By default, a checkbox will return a boolean value signifying whether or 
not it is checked.

```html
<form>
  <input type="checkbox" name="a">
  <input type="checkbox" name="b" checked>
</form>
```

```js
Backbone.Syphon.serialize(view);

// will produce => 

{
  a: false,
  b: true
}
```

For information on how to change this behavior, see the Input Readers
section of the 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

### Radio Button Groups

Radio button groups (grouped by the input element "name" attribute) will
produce a single value, from the selected radio button.

```html
<form>
  <input type="radio" name="a" value="1">
  <input type="radio" name="a" value="2" checked>
  <input type="radio" name="a" value="3">
  <input type="radio" name="a" value="4">
</form>
```

```js
Backbone.Syphon.serialize(view);

// will produce => 

{
  a: "2"
}
```

This behavior can be changed by registering a different set of Key
Extractors, Input Readers, and Key Assignment Validators. See the full
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).
for more information on these.

## Basic Usage : Deserialize

Syphon also allows you to deserialize an object's values back on to a
form. It uses the same conventions and configuration as the serialization
process, with the introduction of Input Writers to handle populating the
form fields with the values. See the full 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).
for more information on Input Writers.

```html
<form>
  <input type="text" name="a">
  <input type="text" name="b">
</form>
```

```js
var data = {
  a: "foo",
  b: "bar"
};

Backbone.Syphon.deserialize(this, data);
```

This will populate the form input elements with the correct values from
the `data` parameter.

## Ignored Input Types

The following types of input are ignored, and not included in
the resulting JavaScript object:

* `<input type="submit">` buttons
* `<input type="reset"`> buttons
* standard `<button>` tags
* `<fieldset>` tags

If you need to get a value from the specific button that was
clicked, you can either include it specifically (see below) or use
a DOM event to listen for that element being manipulated (clicked, for
example) and manually grab the data you need.

### Ignoring Other Input Types

Syphon exposes the list of ignored input types as a raw array. You can
push, pop, and manipulate this array as any other array, to specify which
types of input fields you want to ignore.

This list is global to Syphon and there is no way to customize it for
a specific call to `serialize`.

```js
// ignore all <textarea> input elements
Backbone.Syphon.ignoredTypes.push("textarea");
```

## Serializing Nested Attributes And Field Names

Syphon will parse nested attribute names and create a nested result object,
using the Rails standard of `name="foo[bar][baz]"` by default.

```html
<form>
  <input type="text" name="foo[bar]" value="a value">
  <input type="text" name="foo[baz][quux]" value="another value">
</form>
```

will produce

```js
{
  foo: {
    bar: "a value",
    baz: {
      quux: "another value"
    }
  }
}
```

## Include / Exclude Specific Fields

You can include or exclude specific fields as needed. Inclusion is given
priority and specifying fields to include will force Syphon to exclude all
other fields. Including a field that is ignore by it's type will also force
the field to be included.

### Examples

Given this HTML:

```html
<form>
  <input name="a" value="a-value">
  <input name="b" value="b-value">
  <input name="c" value="c-value">
  <button name="d" value="d-value">
</form>
```

The following will occur:

```js
// include a, b only
Backbone.Syphon.serialize(view, {
  include: ["a", "b"]
});

// will produce =>

{
  a: "a-value",
  b: "b-value"
}
```

```js
// include the normally excluded (button) "d"
Backbone.Syphon.serialize(view, {
  include: ["a", "d"]
});

// will produce =>

{
  a: "a-value",
  d: "d-value"
}
```

```js
// exclude a
Backbone.Syphon.serialize(view, {
  exclude: ["a"]
});

// will produce =>

{
  b: "b-value",
  c: "c-value"
}
```

```js
// include a and b, exclude b and c
Backbone.Syphon.serialize(view, {
  include: ["a", "b"],
  exclude: ["b", "c"]
});

// will produce =>

{
  a: "a-value",
  b: "b-value"
}
```

### Include / Exclude Based On Key Extractors

The include / exclude process uses the registered Key Extractors to determine
which fields to include / exclude. 

This means if you are only using the default Key Extractor which uses 
the "name" attribute, all fields will be included or excluded based on 
the name of the field.

If you have registered other Key Extractors, they will be used when
determining which fields to include / exclude.

```html
<form>
  <input id="a">
  <input type="radio" name="b">

  <input id="c">
  <input type="radio" name="d">
</form>
```

```js
// By default, use the "id"
Backbone.Syphon.KeyExtractors.registerDefault(function($el){
  return $el.prop("id");
});

// For radio buttons, use the "name"
Backbone.Syphon.KeyExtractors.register("radio", function($el){
  return $el.prop("name");
});

// Serialize the form
Backbone.Syphon.serialize(view, {
  exclude: ["a", "b"]
});

// This will produce =>
{
  c: "",
  d: ""
}
```

For more information on Key Extractors, see the full 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

## Other Options

There are a few other options that can be specified when calling the
`Syphon.serialize` method, which allow the behavior of Syphon to be
altered for a single call instead of for all calls.

### Key Extractors

Key extractors are used to generate the "key" in the `{key: "value"}`
result. You can specify a `KeyExtractorSet` as part of the options:

```js
extractors = new Backbone.Syphon.KeyExtractorSet();
// configure it ...

Backbone.Syphone.serialize({
  keyExtractors: extractors
});
```

For more information on Key Extractors, see the full 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

### Input Readers

Input Readers are used to generate the "value" in the `{key: "value"}`
result. You can specify a `InputReadetSet` as part of the options:

```js
readers = new Backbone.Syphon.InputReaderSet();
// configure it ...

Backbone.Syphone.serialize({
  inputReaders: readers
});
```

For more information on Input Readers, see the full 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

### Input Writers

Input Writers are used to set the value of form elements to the 
"value" in the `{key: "value"}` data / object.  At this time, you cannot
specify input writers in the `deserialize` method. That will come
soon, hopefully.

For more information on Input Writers, see the full 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

### Key Assignment Validators

Input Readers are used to validate the assignment of a key to a value,
in the context of an element. You can specify a `InputReadetSet` as part 
of the options:

```js
validators = new Backbone.Syphon.KeyAssignmentValidators();
// configure it ...

Backbone.Syphone.serialize({
  keyAssignmentValidators: validators
});
```

For more information on Key Assignment Validators, see the full 
[API Documentation](https://github.com/derickbailey/backbone.syphon/blob/master/apidoc.md).

## Current Limitations

There some known limitations in Backbone.Syphon, partially by design and
partially implemented as default behaivors. 

* You must have a `<form>` within your view's `$el`
* An input of type `checkbox` will return a boolean value. This can be
overriden by replacing the Input Reader for checkboxes.

## Building Backbone.Syphon

If you wish to build Backbone.Syphon on your system, you will
need Ruby to run the Jasmine specs, and NodeJS to run the
grunt build. 

### To Run The Jasmine Specs

1. Be sure you have Bundler installed in your Ruby Gems. Then
run `bundle install` from the project folder

2. Once this is done, you can run `rake jasmine` to run the 
Jasmine server

3. Point your browser at `http://localhost:8888` and you will
see all of the specs for Backbone.Syphon

### To Build The Packages

1. Be sure you have NodeJS and NPM installed on your system

2. Run `npm install -g grunt` to install the grunt build system

3. From the project folder, run `grunt` to produce a build

## Screencasts

I've recorded several screencasts on how I built Syphon.

* [WatchMeCode: Episode 7](http://watchmecode.net/backbone-plugin): covers the initial project setup, build and release
* [WatchMeCode: Episode 8](http://watchmecode.net/amd-builds-with-grunt): covers setting up an AMD build along side the standard build

## Release Notes

See the [changelog.md]((https://github.com/derickbailey/backbone.syphon/blob/master/changelog.md) file.

## Legal Mumbo Jumbo (MIT License)

Copyright (c) 2012 Derick Bailey, Muted Solutions, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
