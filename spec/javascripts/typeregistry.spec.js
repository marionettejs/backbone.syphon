describe('Type Registry', function() {
  var typeRegistry;
  beforeEach(function() {
    typeRegistry = new Backbone.Syphon.TypeRegistry();
  });

  it('should register a default item', function() {
    var item = {};
    typeRegistry.registerDefault(item);
    expect(typeRegistry.get('default')).to.be.eql(item);
    expect(typeRegistry.get()).to.be.eql(item);
    expect(typeRegistry.get('some type that doesnt exist')).to.be.eql(item);
  });

  it('should get an item', function() {
    var item = {};
    typeRegistry.register('foo', item);
    expect(typeRegistry.get('foo')).to.be.eql(item);
  });

  it('should not get a non existing item', function() {
    var item = {};
    typeRegistry.register('foo', item);
    expect(typeRegistry.get('moo')).to.be.undefined;
  });

  it('should register an item', function() {
    var item = 10;
    typeRegistry.register('foo', item);
    expect(typeRegistry.get('foo')).to.be.equal(item);
  });

  it('should register a falsy item', function() {
    var item = null;
    typeRegistry.register('foo', item);
    expect(typeRegistry.get('foo')).to.be.equal(item);
  });

  it('should re-register and item', function() {
    var item1 = {};
    var item2 = {};
    typeRegistry.register('foo', item1);
    typeRegistry.register('foo', item2);
    expect(typeRegistry.get('foo')).to.be.eql(item2);
  });

  it('should unregister a type', function() {
    var item = {};
    typeRegistry.register('foo', item);
    typeRegistry.unregister('foo');
    expect(typeRegistry.get('foo')).to.be.undefined;
  });

  it('should unregister a falsy value', function() {
    typeRegistry.register('foo', null);
    typeRegistry.unregister('foo');
    expect(typeRegistry.get('foo')).to.be.undefined;
  });
});
