'use strict';

const fs = require('fs');
const settings = require('./lib/settings');
const copyFile = require('./lib/copyFile');

const out = console;

tryCreateRcFile();

function tryCreateRcFile() {
    fs.readFile(settings.rcFilePath, onFileReaded);
}

function onFileReaded(error) {
    if(error) {
        createRcFile();
    } else {
        out.log(`Rc file detected at '${settings.rcFilePath}'`);
    }
}

function createRcFile() {
    out.log('RC file not detected');
    out.log('Creating RC file...');
    copyFile(settings.rcFileName, settings.rcFilePath, onRcFileCreated);
}

function onRcFileCreated() {
    out.log(`RC file created at ${settings.rcFilePath}`);
}
