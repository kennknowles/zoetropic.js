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
], function(_, Backbone, ss, sinon, chai, claire, when) {
    "use strict";

    var expect = chai.expect, assert = chai.assert;

    describe("ToOneReference(foo) <: Reference", function() {
        describe("(src, dst)", function() {
            var deref = ss.ToOneReference({from:'sizzle'});

            it("ToOneReference(foo)(src, dst) === dst.models()[src.attributes()[foo]]", function() {
                var dst = ss.LocalModel();
                var dereffed = deref(ss.LocalModel({ attributes: { sizzle: 'bizzle' } }), 
                                     ss.LocalCollection({ models: { bizzle: dst } }));

                expect(dereffed.uri).to.equal(dst.uri);
            })

            it("ToOneReference(foo)(src, dst) === undefined if not found ", function() {
                expect( deref(ss.LocalModel({ attributes: { sizzle: 'sazzle' } }), 
                                ss.LocalCollection({ models: { bizzle: ss.LocalModel() } })) )
                    .to.equal(undefined);
            });
        });
    });
});
