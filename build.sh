#!/bin/sh

./node_modules/.bin/npm-run-all build:css build:react build:component-css build-dist
cp package.json ../okm
cp -r dist ../okm/