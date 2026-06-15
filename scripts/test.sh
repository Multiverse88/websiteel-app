#!/bin/bash
# Suppress DEP0205 deprecation warnings from Node.js
# Run: ./scripts/test.sh or npm test
node --disable-warning=DEP0205 node_modules/.bin/playwright test "$@"