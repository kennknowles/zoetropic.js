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

    var expect = chai.expect;

    describe("FilterReference({filter: f}) <: Reference", function() {
        it("FilterReference(fn)(src,dst) === dst.models().values().filter( f(src, _) ) // more or less", function() {
            var deref = zt.FilterReference(function(source, dest) { return source.attributes.x === dest.x; });

            var dst = zt.LocalCollection({
                models: {
                    '/foo/1': { x: 1, y: 1 },
                    '/foo/2': { x: 7, y: 2 },
                    '/foo/3': { x: 2, y: 3 },
                    '/foo/4': { x: 9, y: 4 },
                    '/foo/5': { x: 7, y: 5 },
                    '/foo/6': { x: 'hello', y: 6 }
                }
            });

            var dereferenced = _(deref(zt.LocalModel({ attributes: { x: 7 } }), dst)).sortBy(function(foo) { return foo.y; });
            expect(dereferenced).to.deep.equal([{x:7, y:2}, {x:7, y:5}]);
        });
    });
});
