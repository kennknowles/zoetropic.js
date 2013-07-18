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
], function(_, z, sinon, chai, claire, when) {
    "use strict";

    var expect = chai.expect, assert = chai.assert;

    describe("LocalCollectionBackend <: CollectionBackend", function() {
        it("LocalCollectionBackend({models:models}).models === models", function(done) {
            var m = z.LocalModel();
            var backend = z.LocalCollectionBackend({ models: { foo: m } });

            var promise = backend.fetch({ uri: '/fake/uri' });
            when(promise).then(function (fetchedResult)  {
                expect(fetchedResult.models.foo.uri).to.equal(m.uri);
                done();
            });
        });
    });
});
