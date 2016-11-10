'use strict';
const path = require('path');

const rcFileName = '.smart-house-rc';
const rcFilePath = path.join(getUserHome(), rcFileName);

module.exports = {
    rcFileName,
    rcFilePath
};

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
