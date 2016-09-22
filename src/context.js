const configuration = require('./configuration.js');

module.export = {

    // register main otions to the program
    getOptions: function() {
    },

    registerOption: function() {
    },

    getConfig: function() {
        return configuration;
    },

    setConfigValue(key, value) {
        configuration[key] = value;
    }
};
