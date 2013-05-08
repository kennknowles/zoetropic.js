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
], function(_, ss, sinon, chai, claire, when) {
    "use strict";

    var expect = chai.expect, assert = chai.assert;

    describe("LocalCollection <: Collection", function() {
        it("Is constructed directly from a dictionary of models and other options, passing its relationships on to the models", function() {
            var dst = ss.LocalCollection();

            var c = ss.LocalCollection({
                name: 'fooey',
                models: {
                    0: ss.LocalModel()
                }
            }).overlayRelationships({ foo: { link: ss.LinkToCollection(dst) } });

            expect(c.name).to.equal('fooey');
            expect(c.relatedCollection('foo').uri).to.equal(dst.uri);
            expect(c.models[0].relatedCollection('foo').uri).to.equal(dst.uri);
        });
    });
});
