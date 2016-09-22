#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const config = require('./smart-house-config');

// Init program version
const packageJSON = JSON.parse(fs.readFileSync('package.json'));
program.version(packageJSON.version);

const core = require('./src/core')(config(), program, startCommand);

const startCommand = program
    .command('start')
    .description('Start smart house')

// Init smart-house core
core.init();

    startCommand.option('-m, --mock', 'will start broker with mock data')
    .action(function() {
        core.start();
    });


program
    .command('stop')
    .description('Stop smart house')
    .action(function() {
        core.stop();
    });

program
    .command('restart')
    .description('Restart smart house')
    .action(function() {
        core.stop();

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
