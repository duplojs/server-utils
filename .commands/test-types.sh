#!/bin/bash

set -e

tsc -p tsconfig.test.json

# docs
npm -w docs run test:types