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
var MONGO_DB;

// PATH to other libraries distribution
var SH_PATH_FRONTENT_DIST;
var PATH_BACKEND_CMD;
var PATH_BROKER_CMD;

// WEB Configuration
var SH_WEB_PORT;

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
    .option('-p, --port <n>', 'will start backend on specified port (8080 is default)', parseInt)
    .action(startAction);

function startAction(cmd, options) {
    // Setup env varibles
    InitEnvConfiguration();
    process.env['ENV_CONFIG'] = 'production';

    var port = SH_WEB_PORT;
    if (options.port && isFinite(parseInt(options.port))) {
        port = options.port;
    }
    // set port to serve the backend
    process.env['SH_WEB_PORT'] = port;

    //start-backend
    if (options.node) {
        console.log('command :', 'node ' + PATH_BACKEND_CMD);
        exec('node ' + PATH_BACKEND_CMD);
    } else {
        exec('pm2 start ' + PATH_BACKEND_CMD + ' --name ' + PM2_BACKEND_NAME);
    }
    //start-broker
    var cmd;
    if (options.node) {
        cmd = 'node ' + PATH_BROKER_CMD;
        // in mock mode ?
        if (options.mock) {
            cmd += ' --mock';
        }
    } else {
        cmd = 'pm2 start ' + PATH_BROKER_CMD + ' --name ' + PM2_BROKER_NAME;
        if (options.mock) {
            cmd += ' -- --mock';
        }
    }
    // exec broker command
    exec(cmd);
}

function InitEnvConfiguration() {
    // Mongo DB configuration
    MONGO_DB = process.env['MONGO_DB'] || 'mongodb://localhost/db';

    // PATH to other libraries distribution
    SH_PATH_FRONTENT_DIST = process.env['SH_PATH_FRONTENT_DIST'] || path.resolve('./node_modules/smart-house-frontend/dist'); //'../SmartHouse-frontend/dist'
    PATH_BACKEND_CMD =  process.env['PATH_BACKEND_CMD'] || path.resolve('./node_modules/smart-house-backend'); //'../SmartHouse-backend'
    PATH_BROKER_CMD = process.env['PATH_BROKER_CMD'] || path.resolve('./node_modules/smart-house-broker'); //'../SmartHouse-broker'

    // WEB Configuration
    SH_WEB_PORT = process.env['SH_WEB_PORT'] || '8080';

    // MQTT Configuration
    MQTT_PORT = process.env['MQTT_PORT'] || '1883';
    MQTT_HOST_NAME = process.env['MQTT_HOST_NAME'] || 'localhost';
    MQTT_USER_NAME = process.env['MQTT_USER_NAME'] || 'USERNAME';
    MQTT_PASSWORD = process.env ['MQTT_PASSWORD']  || 'PASSWORD';


    // init env
    process.env['MONGO_DB'] = MONGO_DB;
    process.env['SH_WEB_PORT'] = SH_WEB_PORT;
    process.env['SH_PATH_FRONTENT_DIST'] = SH_PATH_FRONTENT_DIST;

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

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}
