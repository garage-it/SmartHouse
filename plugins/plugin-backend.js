const path = require('path');

// const backend = require(path.resolve('../SmartHouse-backend'));
//const backend = require(path.resolve('../SmartHouse-backend'));

module.exports = function(config) {
    // Context
    return function(context) {
        const plugin = {};
        Object.assign(plugin, {
            name: 'smart-house-backend',
            init: _init.bind(plugin, config, context),
            start: _start.bind(plugin, config, context),
            stop: _stop.bind(plugin, config, context),
            destroy: _destroy.bind(plugin, config, context)
        });
        return plugin;
    };
};

function _init(config, context) {
    // context.addStartOption('-p, --port <n>', 'start backend on specified port (8080 is default)', parseInt);
    // console.log('Initialize ' + this.name, '\u2713'.green);
}

function _start(config, context) {
    console.log('Start ' + this.name, '\u2713'.green);
}

function _stop(config, context) {
    console.log('Stop ' + this.name, '\u2713'.green);
}

function _destroy(config, context) {
    console.log('Destroy ' + this.name, '\u2713'.green);
}
