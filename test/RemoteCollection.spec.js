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

    describe("RemoteCollection <: Collection", function() {
        it('.fetch() returns a promise that resolves when remote models come in', function(done) {

            // Set up a mock Backbone that will intercept the fetch and return the appropriate value
            var fetch = sinon.spy();
            var MockBBCollection = Backbone.Collection.extend({ fetch: fetch });

            var MockBackbone = {
                Model: Backbone.Model,
                Collection: MockBBCollection,
            };

            MockBackbone.Collection.foo = 'baz';

            // A RemoteCollectionBackend using this Backbone
            var collection = z.RemoteCollection({
                uri: '/some/fake/url',
                data: {},
                Backbone: MockBackbone
            });

            // The business
            var doneFetching = collection.fetch();

            // Set up the test to complete with known models
            when(doneFetching)
                .then(function(fetchedCollection) {
                    expect(fetchedCollection.models.foo.uri).to.equal('foo');
                    done();
                })
                .otherwise(function(error) {
                    console.error(error.stack);
                });
           
            
            // Fulfill the promise with a made-up backbone model
            var args = fetch.args[0][0];
            var bbModels = [ new Backbone.Model({ resource_uri: 'foo' }) ];
            args.success({ models: bbModels });
        });

        it("Has the name it is given", function() {
            expect(z.RemoteCollection({ uri: 'asdf', name: 'foozle' }).name).to.equal('foozle');
        });
        
        it("Can be given a new name", function() {
            expect(z.RemoteCollection({ uri: 'asdf', name: 'foozle' }).withFields({ name: "bizzle" }).name).to.equal('bizzle');
        });


        //it(".create(...) returns a promise that resolves with the created RemoteModel", function() {
        //
        //});
        
        //it(".create(...) returns a promise that rejects with any errors from the server", function() {
        //
        //});
    });
});
