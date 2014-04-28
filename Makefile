#
# Special notes:
# 1. Tests are always run on the instrumented source just to keep things simple. Speed is not a problem.
# 2. Everything is written in AMD style, hence uses amdefine for the Node bits, hence gives useless errors if it doesn't parse, hence jshint is crucial.

BIN=node_modules/.bin
MOCHA=$(BIN)/mocha --harmony-proxies --harmony-collections
ISTANBUL=$(BIN)/istanbul
JSHINT=$(BIN)/jshint 
R_JS=$(BIN)/r.js

#
# .PHONY targets for the command-line
#

.PHONY: all
all: optimized debug

.PHONY: debug
debug: # TODO
	$(R_JS) -o build.js optimize=none

.PHONY: optimized
optimized: #TODO
	$(R_JS) -o build.js

.PHONY: jshint
jshint:
	$(JSHINT) --verbose lib test

.PHONY: test
test: jshint
	$(MOCHA) --reporter spec ./test/mocha-spec-runner.js

.PHONY: coverage
coverage: jshint lib-cov
	ISTANBUL_REPORTERS=text-summary,html,lcov ZOETROPIC_PATH=lib-cov/zoetropic $(MOCHA) --reporter mocha-istanbul ./test/mocha-spec-runner.js

#
# Actual file targets
#

lib-cov: lib/zoetropic.js 
	rm -rf lib-cov
	mkdir -p lib-cov
	$(ISTANBUL) instrument --output lib-cov --no-compact --variable global.__coverage__ lib
