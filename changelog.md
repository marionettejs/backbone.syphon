## v0.4.1

* Fixed issue w/ field that has no name (or other specified identifier)

## v0.4.0

* Added support for nested field names, defaulting to Rails' standard of `foo[bar][baz]`
* Added notion of `KeySplitter` to define how fields are split apart for nesting
* Fixed issue w/ field that has no name (or other specified identifier)
* Fixed the AMD require statements to match Backbone.Marionette
* Ignore `fieldset`
* Updated to Underscore v1.4.2

## v0.3.0

* Added Input Writers, to deserialize an object back in to a form
* The view's `el` can be a `form` element directly

## v0.2.0

* Specify fields to include or exclude, when calling `.serialize`
* Defaults to input element "name" for the key in the serialized object
* Added Key Extractors and Key Extractor Sets, allowing configuration of how the "key" in `{key: "value"}` serialized objects are generated
* Added Key Assignment Validators and Key Assignment Validator sets, allowing you to validate a key / value pair and prevent it from being attached to the serialization result
* Input Readers are now a type that can be instantiated and replaced, wholesale, instead of just registered / removed
* Created Syphon.TypeRegistry base type which is used by Key Extractors, Input Readders and Key Assignment Validators
* Exposed the `Syphon.ignoredTypes` array, to allow manipulating which input types are ignored
* Allow `keyExtractors`, `inputReaders` and `keyAssignmentValidators` to be specified as part of the options for the call to `serialize`

## v0.1.1

* Ability to register Input Readers for elements other than `<input>`
* An `<input>` element with no `type` attribute will be treated as a `text` input
* Ignore elements of type "submit", "button" and "reset"

## v0.1.0

* Initial release
* Serialize a `<form>` tag and it's input elements in to a simple JavaScript object
* Converts a checkbox in to a boolean value

