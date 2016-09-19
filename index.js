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
const SH_PM2_BACKEND_NAME = 'smart-house-backend';
const SH_PM2_BROKER_NAME = 'smart-house-broker';

// Mongo DB configuration
let SH_MONGO_DB;

// PATH to other libraries distribution
let SH_PATH_FRONTENT_DIST;
let SH_PATH_BACKEND_CMD;
let SH_PATH_BROKER_CMD;

// WEB Configuration
let SH_WEB_PORT;

// MQTT Configuration
let SH_MQTT_PORT;
let SH_MQTT_HOST_NAME;
let SH_MQTT_USER_NAME;
let SH_MQTT_PASSWORD;

program
    .command('start [port]')
    .description('start backend')
    .option('-m, --mock', 'will use mock data')
    .action(startAction);

function startAction(cmd, options) {
    // Setup env varibles
    InitEnvConfiguration();
    process.env['ENV_CONFIG'] = 'production';

    var port = SH_WEB_PORT;
    if (program.args[0] && isFinite(parseInt(program.args[0])) ) {
        port = program.args[0];
    }

    // set port to serve the backend
    process.env['SH_WEB_PORT'] = port;

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

function InitEnvConfiguration() {
    // Mongo DB configuration
    SH_MONGO_DB = process.env['SH_MONGO_DB'] || 'mongodb://localhost/db';

    // PATH to other libraries distribution
    SH_PATH_FRONTENT_DIST = process.env['SH_PATH_FRONTENT_DIST'] || path.resolve('./node_modules/smart-house-frontend/dist'); //'../SmartHouse-frontend/dist'
    SH_PATH_BACKEND_CMD =  process.env['SH_PATH_BACKEND_CMD'] || path.resolve('./node_modules/smart-house-backend'); //'../SmartHouse-backend'
    SH_PATH_BROKER_CMD = process.env['SH_PATH_BROKER_CMD'] || path.resolve('./node_modules/smart-house-broker'); //'../SmartHouse-broker'

    // WEB Configuration
    SH_WEB_PORT = process.env['SH_WEB_PORT'] || '8080';

    // MQTT Configuration
    SH_MQTT_PORT = process.env['SH_WEB_PORT'] || '1883';
    SH_MQTT_HOST_NAME = process.env['SH_MQTT_HOST_NAME'] || 'localhost';
    SH_MQTT_USER_NAME = process.env['SH_MQTT_USER_NAME'] || 'USERNAME';
    SH_MQTT_PASSWORD = process.env ['SH_MQTT_PASSWORD']  || 'PASSWORD';


    // init env
    process.env['SH_MONGO_DB'] = SH_MONGO_DB;
    process.env['SH_WEB_PORT'] = SH_WEB_PORT;

    process.env['SH_WEB_PORT'] = SH_MQTT_PORT;
    process.env['SH_MQTT_HOST_NAME'] = SH_MQTT_HOST_NAME;
    process.env['SH_MQTT_USER_NAME'] = SH_MQTT_USER_NAME;
    process.env ['SH_MQTT_PASSWORD']  = SH_MQTT_PASSWORD;
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
