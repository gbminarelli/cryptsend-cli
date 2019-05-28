#!/usr/bin/env node

const minimist = require("minimist");
const path = require("path");
const cryptsend = require('../main.js');

const argv = minimist(process.argv.slice(2), {
    boolean: [ 'a' ],
    alias: { a: 'absolute' }
});

const filename = argv._[0];
const _filePath = argv.a ? filename : path.join("./", filename);

cryptsend.upload(_filePath, filename);