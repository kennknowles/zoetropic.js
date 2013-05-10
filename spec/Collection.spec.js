/* global describe, it */
/* jshint -W070 */
/* jshint -W030 */
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

    var expect = chai.expect, aztert = chai.assert;

    describe("Collection (interface)", function() {
        it("Provides .overlayRelated applies to all of its models", function() {
            var c = zt.LocalCollection({
                models: {
                    'one': zt.LocalModel({ attributes: { foo: "baz"} }),
                    'two': zt.LocalModel({ attributes: { foo: "biz"} })
                }
            });
            
            var m3 = zt.LocalModel();
            var incomplete_models = {baz: m3};
            var m1 = zt.LocalModel();
            var m2 = zt.LocalModel();
            var c2 = c.overlayRelated({ foo: { models: { baz: m1, biz: m2 } } });
            var c3 = c.overlayRelated({ foo: { models: incomplete_models } });

            expect(c2.models.one.attributes.foo.uri).to.equal(m1.uri);
            expect(c2.models.two.attributes.foo.uri).to.equal(m2.uri);

            expect(c3.models.one.attributes.foo.uri).to.equal(m3.uri);
            expect(c3.models.two.attributes.foo).to.equal(undefined);
        });
        
        it('Has .overlayRelationships that is inherited by its models', function() {
            var c = zt.LocalCollection({
                models: {
                    "/fake/uri/1": zt.LocalModel({ attributes: { bizzle: 'bozzle' } })
                }
            });

            expect(c.models['/fake/uri/1'].attributes.bizzle).to.equal('bozzle'); // sanity check
            expect(c.models['/fake/uri/1'].relationships.foo).to.equal(undefined);
            
            var c2 = zt.LocalCollection();
            var c3 = c.overlayRelationships({
                bizzle: { link: zt.UrlLink({from: 'bizzle'})(zt.LinkToCollection(c2)) },
                foo: { link: zt.UrlLink({from: 'foo'})(zt.LinkToCollection(c2)) }
            });

            expect(c3.relationships.bizzle).to.be.ok;
            expect(c3.relationships.foo).to.be.ok;
            expect(c3.models['/fake/uri/1'].attributes.bizzle).to.equal('bozzle'); // sanity check
            expect(c3.models['/fake/uri/1'].relationships.foo.link.resolve(c).uri).to.equal(c2.uri);
        });
    });
});
