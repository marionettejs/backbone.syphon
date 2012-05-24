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

## Annotated Source Code

Syphon has annotated source code using the Docco tool to turn
comments in to documentation. This provides an in-depth look
at what each section of is doing.

[View The Annotated Source Code](http://derickbailey.github.com/backbone.syphon/docs/backbone.syphon.html)

## Basic Usage

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

## Ignored Input Types

The following types of input are ignored, and not included in
the resulting JavaScript object:

* `<inputtype="submit">` buttons
* `<input type="reset"`> buttons
* standard `<button>` tags

If you need to get a value from the specific button that was
clicked, you should do that in your element click handler.

## Key Extractors

When a form is serialized, all of the input elements are 
passed through a "Key Extractor" based on the type of input.
Key extractors are used to generate the "key" in the
`{key: "value"}` object that is returned from the call
to `.serialize`.

### Default Key Extractor: element "id"

The default key extractor uses the `id` attribute of the form's
input element as the key.

For example, an HTML form that looks like this:

```html
<form>
  <input id="foo" value="bar">
  <input type="checkbox" id="chk" checked>
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
  return $el.prop("name");
});
```

Now an HTML form that looks like this:

```html
<form>
  <input name="quux" value="bar">
  <input type="checkbox" name="thingy" checked>
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

## Input Readers

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

## Handling Non-"input" Elements

You can register an Input Reader or a Key Extractor for a non-`<input>` element by
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

## Current Limitation

There are several known limitations in Backbone.Syphon, still. This list
is basically my "todo" list for the features that need to be implemented.

* You must have a `<form>` within your view's `$el`
* An input of type `checkbox` will return a boolean value
* Cannot add to, or remove from, the ignored input element types
* Cannot specify specific fields to include
* Cannot specify specific fields to ignore

These limitations are by design in the current release, but
are intended to be fixed as the plugin moves forward.

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

### To Build The Release Packages

1. Be sure you have NodeJS and NPM installed on your system

2. Run `npm install -g grunt` to install the grunt build system

3. From the project folder, run `grunt` to produce a build

## Screencasts

I've recorded several screencasts on how I built Syphon.

* [WatchMeCode: Episode 7](http://watchmecode.net/backbone-plugin): covers the initial project setup, build and release
* [WatchMeCode: Episode 8](http://watchmecode.net/amd-builds-with-grunt): covers setting up an AMD build along side the standard build

## Release Notes

### v0.2.0

* Added the notion of Key Extractors, allowing configuration of how the "key" in `{key: "value"}` serialized objects are generated

### v0.1.1

* Ability to register Input Readers for elements other than `<input>`
* An `<input>` element with no `type` attribute will be treated as a `text` input
* Ignore elements of type "submit", "button" and "reset"

### v0.1.0

* Initial release
* Serialize a `<form>` tag and it's input elements in to a simple JavaScript object
* Converts a checkbox in to a boolean value

## Legal Mumbo Jumbo (MIT License)

Copyright (c) 2012 Derick Bailey, Muted Solutions, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
