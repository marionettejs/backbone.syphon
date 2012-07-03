Backbone.Syphon.KeySplitter = function(key){
  var sections = key.split("[");
  matches = _.map(sections, function(section){ return section.replace("]","");});
  return matches;
}
