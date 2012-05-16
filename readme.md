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

## Set Key To The Element's Id

The current convention for setting the key of the JSON
object key/values, is the `id` attribute of the form's
input element.

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

## Current Limitation

As of the v0.1.0 release, there are several known
limitations.

* You must have a `<form>` within your view's `$el`
* An input of type `checkbox` will return a boolean value
* Input types such as buttons may return a value in the result
* The key of the returned object's key/values will always be set to the `id` of the input element

These limitations are by design in the initial release, but
are intended to be solved / removed as the plugin moves
forward.

## Building Backbone.Syphon

If you wish to build Backbone.Syphon on your system, you will
need Ruby to run the Jasmine specs, and NodeJS to run the
grunt build. 

## WatchMeCode: Episode 7

The initial build and release of Backbone.Syphon was recorded
as a live screencast, and partially edited to cut out some
of the long silences and rough spots. If you're interested
in seeing how I move from nothing to a first release of a
Backbone plugin, check out [WatchMeCode: Episode 7](http://watchmecode.net/backbone-plugin).

## Release Notes

### v0.1.0

* Initial release
* Serialize a `<form>` tag and it's input elements in to a simple JavaScript object
* Converts a checkbox in to a boolean value

## Legal Mumbo Jumbo (MIT License)

Copyright (c) 2012 Derick Bailey, Muted Solutions, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
