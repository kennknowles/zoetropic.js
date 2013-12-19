var requirejs = require('requirejs');

var zoetropicPath = process.env.ZOETROPIC_PATH || 'lib/zoetropic';

requirejs.config({
    baseUrl: '.',
    nodeRequire: require,
    paths: {
        'zoetropic': zoetropicPath
    }
});

/*
   Only the use of `requirejs :: String -> Module` is synchronous, 
   which is necessary for mocha to work properly.

   Do not attempt to use `requirejs :: [String] -> ([Module] -> Module) -> ()`
*/
requirejs('test/spec');

