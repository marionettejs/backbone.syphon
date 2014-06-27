// Key Extractors
// --------------

// Key extractors produce the "key" in `{key: "value"}`
// pairs, when serializing.
var KeyExtractorSet = Syphon.KeyExtractorSet = TypeRegistry.extend();

// Built-in Key Extractors
var KeyExtractors = Syphon.KeyExtractors = new KeyExtractorSet();

// The default key extractor, which uses the
// input element's "name" attribute
KeyExtractors.registerDefault(function($el) {
  return $el.prop('name') || '';
});
