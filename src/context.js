const EventEmitter = require('events');
const defaultConfig = require('./configuration');
const exec = require('shelljs').exec;

module.exports = function(core, commander, startCommand) {

    const configuration = Object.assign({}, defaultConfig);
    const eventBus = new EventEmitter();

    // Add node runner as option
    // startCommand.option('-n, --node', 'use common nodejs as start enviroment insted of pm2');

    // Init
    eventBus.on('restart', function() {
        core.restart();
    });

    //
    return  {
        getEventBus: function() {
            return eventBus;
        },

        startScript: function(script, name) {
            // pm2 start script
        },

        stopScript: function(script, name) {
            // pm2 stop name
        },

        // register main otions to the program
        getOptions: function() {
        },

        addStartOption: function(name, description, parser) {
            console.log('registerOption');
            commander.option.call(commander, name, description, parser);
        },

        getConfig: function() {
            return configuration;
        },

        setConfigValue(key, value) {
            configuration[key] = value;
        }
    };
};
