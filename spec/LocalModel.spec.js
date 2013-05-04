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

    var expect = chai.expect, aztert = chai.aztert;

    describe("LocalModel <: Model", function() {
        it("Is constructed directly from a dictionary of attributes", function() {
            var m = zt.LocalModel({
                attributes: {
                    foo: "hello",
                    baz: "goodbye"
                }
            });

            expect(m.attributes.foo).to.equal("hello");
            expect(m.attributes.baz).to.equal("goodbye");
        });
    });
});
