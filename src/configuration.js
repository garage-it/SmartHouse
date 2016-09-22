const path = require('path');

module.export = {
    SMART_HOUSE_PREFIX:  '',

    PATH_FRONTENT_DIST: path.resolve('./node_modules/smart-house-frontend/dist'),
    PATH_BACKEND_CMD: path.resolve('./node_modules/smart-house-backend'),
    PATH_BROKER_CMD: path.resolve('./node_modules/smart-house-broker'),

    PORT: '80',

    MQTT_PORT: '1883',
    MQTT_HOST_NAME: 'localhost',
    MQTT_USER_NAME: 'USERNAME',
    MQTT_PASSWORD: 'PASSWORD'
};
