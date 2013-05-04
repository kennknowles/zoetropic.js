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

    describe("UrlLink :: {from: String} -> (Link -> Link)", function() {
        it("Is a link from an attribute containing a Url to all related items in the other collection", function() {
            var src = zt.LocalCollection({
                models: {
                    a: zt.LocalModel({ attributes: { x: '/resource/1' } }),
                    b: zt.LocalModel({ attributes: { x: '/resource/47' } }),
                    c: zt.LocalModel({ attributes: { x: null } }),
                    d: zt.LocalModel({ attributes: { x: '/resource/1' } }),
                    e: zt.LocalModel()
                }
            });

            var dst = zt.LocalCollection();
            
            var link = zt.LinkToCollection(dst);
            var urlLink = zt.UrlLink({ from: 'x', })(link);

            var filteredDst = urlLink.resolve(src);
            expect(filteredDst.data).to.deep.equal({ id__in: ['1', '47'], limit: 0 });
        });
    });
});
