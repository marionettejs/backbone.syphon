// Backbone.Syphon.KeySplitter
// ---------------------------

// This function is used to split DOM element keys in to an array
// of parts, which are then used to create a nested result structure.
// returning `["foo", "bar"]` results in `{foo: { bar: "value" }}`.
//
// Override this method to use a custom key splitter, such as:
// `<input name="foo.bar.baz">`, `return key.split(".")`
var KeySplitter = Syphon.KeySplitter = function(key){
  var matches = key.match(/[^\[\]]+/g);
  var lastKey;

  if (key.indexOf("[]") === key.length - 2){
    lastKey = matches.pop();
    matches.push([lastKey]);
  }

  return matches;
};
