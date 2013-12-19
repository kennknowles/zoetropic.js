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

    var expect = chai.expect, assert = chai.assert;

    describe("RemoteModel <: Model", function() {
        it("RemoteModel.save uses Backbone.save", function() {
            var spySet = sinon.spy();
            var spyFetch = sinon.spy();
            var spySave = sinon.spy();
            var MockBBModel = Backbone.Model.extend({
                fetch: spyFetch,
                save: spySave
            });

            var MockBackbone = {
                Model: MockBBModel
            };

            var model  = zt.RemoteModel({
                name: 'foozle',
                uri: '/some/fake/url',
                Backbone: MockBackbone
            });
            var doneSaving = model.save();

            assert(spySave.called);
        });
    });
});
