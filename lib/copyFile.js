'use strict';

const fs = require('fs');

module.exports = copyFile;

function copyFile(source, target, cb) {
    let cbCalled = false;

    const readStream = fs.createReadStream(source);
    readStream.on('error', done);
    const writeStream = fs.createWriteStream(target);
    writeStream.on('error', done);
    writeStream.on('close', done);
    readStream.pipe(writeStream);

    function done(err) {
        if (!cbCalled) {
            cb(err);
            cbCalled = true;
        }
    }
}
