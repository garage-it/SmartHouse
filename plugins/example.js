module.exports = function(config) {
    // context
    return function(context) {
        const plugin = {
            name: 'example',
            init: _init.bind(plugin, config, context),
            start: _start.bind(plugin, config, context),
            stop: _stop.bind(plugin, config, context)
        }
        return plugin;
    };
};

function _init(config, context) {
    console.log('Initialize ' + this.name);
}

function _start(config, context) {
    console.log('Start ' + this.name);
}

function _stop(config, context) {
    console.log('Stop ' + this.name);
}
