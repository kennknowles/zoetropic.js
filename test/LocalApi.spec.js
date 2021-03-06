/* global describe, it */
/* jshint -W070 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    'underscore',
    'zoetropic',
    'sinon',
    'chai',
    'claire',
    'when',
], function(_, zt, sinon, chai, claire, when) {
    "use strict";

    var expect = chai.expect, assert = chai.assert;

    describe("LocalApi <: Api", function() {
        it("Is constructed directly from a dictionary of collections and relationships-by-name, and augments the collections with these relationships", function() {
            var api = zt.LocalApi({
                collections: {
                    'foo': zt.LocalCollection(),
                    'baz': zt.LocalCollection()
                },
                relationships: {
                    foo: { bizzle: { collection: 'baz' } },
                    baz: { bozzle: { collection: 'foo' } }
                }
            });

            expect(api.collections.foo.relatedCollection('bizzle').uri).to.equal(api.collections.baz.uri);
        });

        it("When fetched, returns the same thing", function(done) {
            var api = zt.LocalApi({
                collections: {
                    'foo': zt.LocalCollection(),
                    'baz': zt.LocalCollection()
                },
                relationships: {
                    foo: { bizzle: { collection: 'baz' } },
                    baz: { bozzle: { collection: 'foo' } }
                }
            });

            when(api.fetch())
                .then(function(nextApi) {
                    expect( _(nextApi.collections).keys().sort() ).to.deep.equal( _(api.collections).keys().sort() );
                    expect( _(nextApi.relationships).keys().sort() ).to.deep.equal( _(api.collections).keys().sort() );
                    done();
                })
                .otherwise(function(err) {
                    console.error(err.stack);
                });
        });
    });
});
