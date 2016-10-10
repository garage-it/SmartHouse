// const pluginBroker = require('./plugins/plugin-broker');
// const pluginTimeSeries = require('./plugins/plugin-time-series');

// Plugin Check
const pluginDBCheck = require('./plugins/plugin-db-check');
const pluginFrontend = require('../SmartHouse-frontend');// require('smart-house-frontend');
const pluginBackend = require('../SmartHouse-backend/src/plugin.js');// require('smart-house-backend');

//const path = require('path');

module.exports = function() {

    return {
        // Shared configuration between different plugins
        configuration: {
            // MongoDB connection configuration
            MONGO: 'mongodb://localhost/db',

            // Start backend on spenified port
            BACKEND_PORT: '8080',
            /* PATH_FRONTENT_DIST: '', */

            // Start Mqtt with specified port
            MQTT_PORT: '1883',
            MQTT_HOST_NAME: 'localhost',
            MQTT_USER_NAME: 'USERNAME',
            MQTT_PASSWORD: 'PASSWORD',

            // plugins exec mode: node or pm2(default)
            EXEC_MODE: 'pm2', //'node'
            EXEC_LOGS: true
        },
        // List plugins including core (backend, frontend, broker)
        plugins: [
            // check mongodb connection
            pluginDBCheck({
                /* MONGO */
            }),

            // setup frontend
            pluginFrontend({
                // PATH_FRONTENT_DIST: path.resolve(__dirname + '/node_modules/smart-house-frontend/dist')
            }),

            // start backend
            pluginBackend({
            })


            /* ,pluginBroker({
                // MQTT_PORT: '1883',
                // MQTT_HOST_NAME: 'localhost',
                // MQTT_USER_NAME: 'USERNAME',
                // MQTT_PASSWORD: 'PASSWORD'
            }) */
            /*
            pluginBackend({
                    // PORT: 8080,
                    // MQTT_PORT: '1883',
                    // MQTT_HOST_NAME: 'localhost',
                    // MQTT_USER_NAME: 'USERNAME',
                    // MQTT_PASSWORD: 'PASSWORD'
            }),
            */
            // start broker
            /*
                pluginBroker({
                    // MQTT_PORT: '1883',
                    // MQTT_HOST_NAME: 'localhost',
                    // MQTT_USER_NAME: 'USERNAME',
                    // MQTT_PASSWORD: 'PASSWORD'
                }),
            // Start Time Series plugin
                pluginTimeSeries({
                    interval: 1000
                })
            */
        ]
    };
};
