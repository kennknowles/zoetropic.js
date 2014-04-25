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
], function(_, Backbone, z, sinon, chai, claire, when) {
    "use strict";

    var expect = chai.expect,
        assert = chai.assert;

    describe("RemoteApi <: Api", function() {
        it('.fetch() returns a promise that resolves when the schema comes in', function(done) {

            // Set up a mock Backbone that will intercept the fetch and return the appropriate value
            var fetch = sinon.spy();
            var MockBBModel = Backbone.Model.extend({ fetch: fetch });

            var MockBackbone = {
                Model: MockBBModel,
                Collection: Backbone.Collection
            };

            MockBackbone.Model.foo = 'baz';

            // A RemoteApiBackend using this Backbone
            var api = z.RemoteApi({
                uri: '/some/fake/url',
                data: {},
                Backbone: MockBackbone
            });

            // The business
            var doneFetching = api.fetch();

            // Set up the test to complete with known models
            when(doneFetching)
                .then(function(fetchedApi) {
                    expect(fetchedApi.collections).to.have.property('collection1');
                    done();
                })
                .otherwise(function(error) {
                    console.error(error.stack);
                });
           
            
            // Fulfill the promise with a made-up backbone model
            var args = fetch.args[0][0];
            var bbModel = new Backbone.Model({
                collection1: { list_endpoint: '/some/fake/collection/uri1' },
                collection2: { list_endpoint: '/some/fake/collection/uri2' }
            });
            args.success(bbModel);
        });
    });
});
