/* jshint -W070 */
/* jshint -W064 */
/* jshint -W025 */
/* jshint -W055 */
/* jshint -W030 */
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([ 
    'backbone', 
    'contracts-js',
    'underscore',
    'URIjs',
    'when'
], function(Backbone, contracts, _, URI, when) {
    'use strict';
    
    ///// FilterReference <: Reference
    //
    // A filter reference is a "virtual" reference, not actually present on the model, but implicit
    // by filtering the target collection according to some predicate of the model.
    
    var FilterReference = function(filter) {
        return function(sourceModel, destCollection) {
            _(destCollection).has('models') || die('Collection passed to FilterReference missing `models`:' + destCollection);

            return _.chain(destCollection.models)
                .values()
                .filter(function(m) { return filter(sourceModel, m); })
                .value();
        };
    };

    return FilterReference;
});
