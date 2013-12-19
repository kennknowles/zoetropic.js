requirejs.config({
    // The RequireJS docs advise against configuring paths to node_modules for use *in node*
    // but I do it for use *in the browser*, because it is just the test suite
    paths: {
        "zoetropic"          : "../lib/zoetropic",
        "jquery"             : "vendor/jquery-1.8.2"
    },
    packages: [
        { "name": "backbone",     "main": "backbone.js",              "location": "../node_modules/backbone"                  },
        { "name": "boo",          "main": "boo.js",                   "location": "vendor/boo-1.2.4/lib"                      },
        { "name": "chai",         "main": "chai.js",                  "location": "../node_modules/chai"                      },
        { "name": "claire",       "main": "index.js",                 "location": "vendor/claire-0.3.2"                       },
        { "name": "flaw",         "main": "index.js",                 "location": "vendor/flaw-0.1.0"                         },
        { "name": "mocha",        "main": "mocha.js",                 "location": "../node_modules/mocha"                     },
        { "name": "prelude-ls",   "main": "prelude.js",               "location": "vendor/prelude-ls-0.6.0"                   },
        { "name": "sinon",        "main": "pkg/sinon.js",             "location": "../node_modules/sinon"                     },
        { "name": "mocha",        "main": "mocha.js",                 "location": "../node_modules/mocha"                     },
        { "name": "underscore",   "main": "underscore.js",            "location": "../node_modules/underscore"                },
        { "name": "URIjs",        "main": "URI.js",                   "location": "../node_modules/URIjs/src"                 },
        { "name": "when",         "main": "when.js",                  "location": "../node_modules/when"                      }
    ],
    shim: {
        "backbone": { 
            exports: "Backbone",
            deps: ["underscore", "jquery"]
        },
        "boo": {
            exports: "boo"
        },
        "jquery": {
            exports: "$"
        },
        "mocha": { 
            exports: "mocha" 
        },
        "sinon": {
            exports: "sinon"
        },
        "underscore": { 
            exports: "_" 
        }
    },
    urlArgs: "v=" + (new Date()).getTime()
});
