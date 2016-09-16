#!/usr/bin/env node

const colors = require('colors');
const fs = require('fs');
const program = require('commander');
const exec = require('shelljs').exec;
const path = require('path');

/**
* Init program version
*/
const packageJSON = JSON.parse(fs.readFileSync('package.json'));
program.version(packageJSON.version);

/**
* Init pm2 magic constants
*/
const SH_PM2_BACKEND_NAME = 'smart-house-backend';
const SH_PM2_BROKER_NAME = 'smart-house-broker';

/**
* Init path constants
*/
const SH_PATH_FRONTENT_DIST = path.resolve('./node_modules/smart-house-frontend/dist'); //'../SmartHouse-frontend/dist'
const SH_PATH_BACKEND_CMD =  path.resolve('./node_modules/smart-house-backend'); //'../SmartHouse-backend'
const SH_PATH_BROKER_CMD = path.resolve('./node_modules/smart-house-broker'); //'../SmartHouse-broker'

/**
* Will serve backend on specified port
*/
const SH_BACKEND_PORT = '8080';

program
    .command('start [port]')
    .description('start backend')
    .option('-m, --mock', 'will use mock data')
    .action(startAction);

function startAction(cmd, options) {

    var port = SH_BACKEND_PORT;
    if (program.args[0] && isFinite(parseInt(program.args[0])) ) {
        port = program.args[0];
    }
    process.env['ENV_CONFIG'] = 'production';
    process.env['SH_PATH_FRONTENT_DIST'] = SH_PATH_FRONTENT_DIST;

    // set port to serve the backend
    process.env['SH_BACKEND_PORT'] = port;

    //start-backend
    exec('pm2 start ' + SH_PATH_BACKEND_CMD + ' --name ' + SH_PM2_BACKEND_NAME);

    //start-broker
    var cmd = 'pm2 start ' + SH_PATH_BROKER_CMD + ' --name ' + SH_PM2_BROKER_NAME;
    // start broker in mock mode ?
    if (options.mock) {
        cmd += ' -- --mock';
    }
    exec(cmd);
}

program
    .command('stop')
    .description('Stop backend')
    .action(stopAction);

function stopAction() {
    exec('pm2 delete ' + SH_PM2_BACKEND_NAME );
    exec('pm2 delete ' + SH_PM2_BROKER_NAME );
}

program
    .command('status')
    .description('Services status')
    .action(statusAction);

function statusAction() {
    exec('pm2 status');
}

program
    .command('restart')
    .description('Restart services')
    .action(restartAction);

function restartAction() {
    exec('pm2 restart ' + SH_PM2_BACKEND_NAME);
    exec('pm2 restart ' + SH_PM2_BROKER_NAME);
}

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}
