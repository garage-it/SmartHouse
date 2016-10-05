#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const config = require('./smart-house-config');
/* eslint-disable no-unused-vars */
const colors = require('colors');
/* eslint-disable no-unused-vars */

// Init program version
const packageJSON = JSON.parse(fs.readFileSync('package.json'));
program.version(packageJSON.version);

var startCommand = program
    .command('start')
    .description('Start smart house');

// Init smart-house core
var core = require('./src/core')(config(), program, startCommand);

startCommand.option('-m, --mock', 'will start broker with mock data')
    .action(function() {
        core.start().catch(function(error) {
            /* eslint-disable no-console */
            console.log(error.red);
            /* eslint-enable no-console */
        });
    });

program
    .command('stop')
    .description('Stop smart house')
    .action(function() {
        core.stop().catch(function(error) {
            /* eslint-disable no-console */
            console.log(error.red);
            /* eslint-enable no-console */
        });
    });

program
    .command('restart')
    .description('Restart smart house')
    .action(function() {
        core.restart().catch(function(error) {
            /* eslint-disable no-console */
            console.log(error.red);
            /* eslint-enable no-console */
        });
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}

// Clear all on main process exit
/* process.on('exit', function () {
    core.destroy();
});
*/
/*
process.on('SIGINT', function() {
    // core.destroy();
    // process.exit();
});
*/
