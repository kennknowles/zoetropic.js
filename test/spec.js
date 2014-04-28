/* jshint -W070 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    // Keep alphabetical for easy cross-checking with directory listing
    './Api.spec',
    './Collection.spec',
    './FilterLink.spec',
    './FilterReference.spec',
    './LocalApi.spec',
    './LocalCollection.spec',
    './LocalCollectionBackend.spec',
    './LocalModel.spec',
    './Model.spec',
    './RemoteModel.spec',
    './RemoteCollection.spec',
    './RemoteApi.spec',
    './ToManyReference.spec',
    './ToOneReference.spec',
    './UrlLink.spec',
], function() {
    // noop, just aggregating the specs
});
