#!/usr/bin/env node

const minimist = require("minimist");
const path = require("path");
const cryptsend = require('../main.js');
const argv = minimist(process.argv.slice(2));

if (argv._.length) {
    const filePath = argv._[0];
    cryptsend.upload(filePath);
} else {
    console.log(`Usage: cryptsend <file> 
    encrypt and upload your file to the cloud, and share the link.`);
}
