/* global describe, it */
/* jshint -W070 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    'underscore',
    'backbone',
    'zoetropic',
    'sinon',
    'chai',
    'claire',
    'when',
], function(_, Backbone, zt, sinon, chai, claire, when) {
    "use strict";

    var expect = chai.expect, aztert = chai.aztert;

    describe("Model", function() {
        it("Directly wraps the implementation", function() {
            var impl = {
                name: 'foo',
                uri: 'zoo',
                attributes: {},
                errors: {},
                relationships: function() { },
                fetch: function() { },
                save: function() { }
            };
            var m = zt.Model(impl);
        });

        it("Provides .toJSON that serializes the current value of the attributes, not the Model interface itself", function() {
            var impl = {
                name: 'foo',
                uri: 'zoo',
                attributes: { foo: 'baz' },
                errors: {},
                relationships: function() { },
                fetch: function() { },
                save: function() { }
            };
            var m = zt.Model(impl);

            expect(JSON.parse(JSON.stringify(m))).to.deep.equal({foo: 'baz'});
            
            var impl2 = { 
                name: 'foo',
                uri: 'zoo',
                errors: {},
                relationships: function() { },
                fetch: function() { },
                save: function() { },
                attributes: {
                    foo: 'baz',
                    subresource: zt.LocalModel({ attributes: { bizzle: 'bazzle' } })
                }
            };
            var m2 = zt.Model(impl2);
            
            expect(JSON.parse(JSON.stringify(m2))).to.deep.equal({foo: 'baz', subresource: { bizzle: 'bazzle'} });
        });

        it("Provides .overlayAttributes that overlays the provided attributes with the underlying attributes", function() {

            var m = zt.LocalModel({ 
                name: 'foo',
                uri: 'bizzle',
                attributes: {"foo": 1, "baz": 8},
                fetch: function() { },
                save: function() { }
            });
            var overlayed = {"foo": 4};
            var overlayed2 = {"bizzz": 5};

            var m2 = m.overlayAttributes(overlayed);
            var m3 = m.overlayAttributes(overlayed2);
            
            expect(m.attributes.foo).to.equal(1);
            expect(m2.attributes.foo).to.equal(4);
            expect(m3.attributes.bizzz).to.equal(5);
        });

        it("Model.overlayRelated overlays attribute values that are dereferenced from related collections", function() {
            var m = zt.LocalModel({ 
                name: 'foo',
                uri: 'bizzle',
                attributes: {"foo": 'baz'},
                fetch: function() { },
                save: function() { }
            });

            var m2 = zt.LocalModel();
            var c = zt.LocalCollection({
                models: {baz: m2}
            });
            
            var m3 = m.overlayRelated({foo: c});
            expect(m3.attributes.foo.uri).to.equal(m2.uri);
        });
    });
});
