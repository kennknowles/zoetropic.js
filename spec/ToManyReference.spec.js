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

    describe("ToManyReference(foo) <: Reference", function() {
        describe("(src, dst)", function() {
            var deref = zt.ToManyReference({from:'sizzle'});

            it("ToManyReference(foo)(src, dst) === _(src.attributes()[foo]).map(dst.models()[_])", function() {
                var m1 = zt.LocalModel();
                var m2 = zt.LocalModel();
                var dereffed = deref(zt.LocalModel({ attributes: { sizzle: ['bizzle', 'bozzle'] } }), 
                                     zt.LocalCollection({ models: { bizzle: m1, bozzle: m2 } }));

                expect( _(dereffed).map(function(model) { return model.uri; }).sort() )
                    .to.deep.equal([m1.uri, m2.uri].sort());
            })

            it("ToManyReference(foo)(src, dst) === undefined if not all found?", function() {
                expect(deref(zt.LocalModel({ attributes: { sizzle: ['sazzle'] } }), 
                             zt.LocalCollection({ models: { bizzle: zt.LocalModel() } })))
                    .to.equal(undefined);
            });
        });
    });
});
