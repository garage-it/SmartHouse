const core = require('/src/core.js');
const pluginTimeseries = require('../plugins/plugin-time-series');
const pluginBackend = require('../plugins/plugin-backend');
const pluginFrontend = require('../plugins/plugin-frontend');
const pluginBroker = require('../plugins/plugin-broker');

module.exports = function() {
    return {
        plugins: [
            pluginBackend({
                port: 8080
            }),
            pluginFrontend({
            }),
            pluginBroker({
                MQTT_PORT: '1883',
                MQTT_HOST_NAME: 'localhost',
                MQTT_USER_NAME: 'USERNAME',
                MQTT_PASSWORD: 'PASSWORD'
            }),
            pluginTimeseries({
                interval: 1000
            })
        ]
    };
};
