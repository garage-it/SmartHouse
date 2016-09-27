#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const exec = require('shelljs').exec;
const path = require('path');
require('dotenv').config();

/**
* Init program version
*/
const packageJSON = JSON.parse(fs.readFileSync('package.json'));
program.version(packageJSON.version);

/**
* Init pm2 magic constants
*/
const PM2_BACKEND_NAME = 'smart-house-backend';
const PM2_BROKER_NAME = 'smart-house-broker';

// Mongo DB configuration
var MONGO;

// PATH to other libraries distribution
var PATH_FRONTENT_DIST;
var PATH_BACKEND_CMD;
var PATH_BROKER_CMD;

// WEB Configuration
var PORT;

// MQTT Configuration
var MQTT_PORT;
var MQTT_HOST_NAME;
var MQTT_USER_NAME;
var MQTT_PASSWORD;

program
    .command('start [options]')
    .description('start backend')
    .option('-m, --mock', 'will start broker with mock data')
    .option('-n, --node', 'will start jobs via node, but not pm2')
    .option('-l, --log', 'start process in node mode and out broker logs')
    .option('-p, --port <n>', 'will start backend on specified port (8080 is default)', parseInt)
    .action(startAction);


function startAction(cmd, options) {
    // Stop runing actions (if such in use)
    stopAction();

    // Setup env varibles
    InitEnvConfiguration();
    process.env['ENV_CONFIG'] = 'production';

    var mPort = PORT;
    if (options.port && isFinite(parseInt(options.port))) {
        mPort = options.port;
    }
    // set port to serve the backend
    process.env['PORT'] = mPort;

    //start-backend
    if (options.node || options.log) {
        exec('node "' + PATH_BACKEND_CMD + '"', {async:true});
        var shellcmd = 'node "' + PATH_BROKER_CMD + '"' + (options.mock ? ' --mock' : '') + (options.log ? ' --log' : '');
        var child = exec(shellcmd, {async:true});
        if (options.log) {
            child.stdout.on('data', function(data) {
                /* eslint-disable no-console */
                console.log(data);
                /* eslint-enable no-console */
            });
        }
    }  else {
        exec('pm2 start "' + PATH_BACKEND_CMD + '" --name ' + PM2_BACKEND_NAME);
        exec('pm2 start "' + PATH_BROKER_CMD + '" --name ' + PM2_BROKER_NAME + (options.mock ? ' --mock' : ''));
    }
}

function InitEnvConfiguration() {
    // Mongo DB configuration
    MONGO = process.env['MONGO'] || 'mongodb://localhost/db';

    // PATH to other libraries distribution
    PATH_FRONTENT_DIST = process.env['PATH_FRONTENT_DIST'] || path.resolve('./node_modules/smart-house-frontend/dist'); //'../SmartHouse-frontend/dist'
    PATH_BACKEND_CMD =  process.env['PATH_BACKEND_CMD'] || path.resolve('./node_modules/smart-house-backend'); //'../SmartHouse-backend'
    PATH_BROKER_CMD = process.env['PATH_BROKER_CMD'] || path.resolve('./node_modules/smart-house-broker'); //'../SmartHouse-broker'

    // WEB Configuration
    PORT = process.env['PORT'] || '8080';

    // MQTT Configuration
    MQTT_PORT = process.env['MQTT_PORT'] || '1883';
    MQTT_HOST_NAME = process.env['MQTT_HOST_NAME'] || 'localhost';
    MQTT_USER_NAME = process.env['MQTT_USER_NAME'] || 'USERNAME';
    MQTT_PASSWORD = process.env ['MQTT_PASSWORD']  || 'PASSWORD';


    // init env
    process.env['MONGO'] = MONGO;
    process.env['PORT'] = PORT;
    process.env['PATH_FRONTENT_DIST'] = PATH_FRONTENT_DIST;

    process.env['MQTT_PORT'] = MQTT_PORT;
    process.env['MQTT_HOST_NAME'] = MQTT_HOST_NAME;
    process.env['MQTT_USER_NAME'] = MQTT_USER_NAME;
    process.env ['MQTT_PASSWORD']  = MQTT_PASSWORD;
}

program
    .command('stop')
    .description('Stop backend')
    .action(stopAction);

function stopAction() {
    exec('pm2 delete ' + PM2_BACKEND_NAME );
    exec('pm2 delete ' + PM2_BROKER_NAME );
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
    exec('pm2 restart ' + PM2_BACKEND_NAME);
    exec('pm2 restart ' + PM2_BROKER_NAME);
}

program
    .command('logs')
    .description('Restart services')
    .action(function() {
        exec('pm2 logs');
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}
