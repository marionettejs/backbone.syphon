Backbone.Syphon - serialize the forms in your
Backbone.Views into a JSON object for use with 
Backbone's models.

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
