#!/usr/bin/env node

const minimist = require("minimist");
const path = require("path");
const cryptsend = require('../main.js');
const filePath = minimist(process.argv.slice(2))._[0];

cryptsend.upload(filePath);