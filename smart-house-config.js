const pluginTimeSeries = require('./plugins/plugin-time-series');
const pluginBackend = require('./plugins/plugin-backend');
const pluginFrontend = require('./plugins/plugin-frontend');
const pluginBroker = require('./plugins/plugin-broker');

const pluginDBCheck = require('./plugins/plugin-db-check');
const path = require('path');

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
            MQTT_PASSWORD: 'PASSWORD'
        },

        // List plugins including core (backend, frontend, broker)
        plugins: [
            // check mongodb configuration connection
            pluginDBCheck({
                /* MONGO */
            }),
            // start backend
            pluginBackend({
                /*
                    PORT: 8080,
                    MQTT_PORT: '1883',
                    MQTT_HOST_NAME: 'localhost',
                    MQTT_USER_NAME: 'USERNAME',
                    MQTT_PASSWORD: 'PASSWORD'
                */
            }),
            // start frontend
            pluginFrontend({
                /* PATH_FRONTENT_DIST: '' */
                PATH_FRONTENT_DIST: path.resolve(__dirname + '/node_modules/smart-house-frontend/dist')
            }),
            // start broker
            pluginBroker({
                /*
                    MQTT_PORT: '1883',
                    MQTT_HOST_NAME: 'localhost',
                    MQTT_USER_NAME: 'USERNAME',
                    MQTT_PASSWORD: 'PASSWORD'
                */
            }),
            pluginTimeSeries({
                interval: 1000
            })
        ]
    };
};
