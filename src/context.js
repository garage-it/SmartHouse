const EventEmitter = require('events');
const defaultConfig = require('./configuration');
// const exec = require('shelljs').exec;

module.exports = function(config, core, commander) {

    const configuration = Object.assign({}, defaultConfig, config);
    const eventBus = new EventEmitter();

    // Add node runner as option
    // startCommand.option('-n, --node', 'use common nodejs as start enviroment insted of pm2');

    // Init
    eventBus.on('restart', function() {
        core.restart();
    });

    //
    const context = {
        getEventBus: function() {
            return eventBus;
        },

        startScript: function(/* script, name */) {
            // pm2 start script
        },

        stopScript: function(/* script, name */) {
            // pm2 stop name
        },

        // register main otions to the program
        getOptions: function() {
        },

        addStartOption: function(name, description, parser) {
            commander.option.call(commander, name, description, parser);
        },

        getConfig: function() {
            return configuration;
        },

        setStaticMountPoint: function(location) {
            context.setConfigValue('PATH_FRONTENT_DIST', location);
        },

        setConfigValue(key, value) {
            configuration[key] = value;
        }
    };
    return context;
};
