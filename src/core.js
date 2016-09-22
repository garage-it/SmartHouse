const _ = require('underscore');

module.exports = function(pluginConfig, program) {
    const _plugins = [];
    const _options = {};
    const SmartHouseCore = {};
    const Commander = program;

    const context = require('./context')(SmartHouseCore, Commander);

    Object.assign(SmartHouseCore,  {

        getContext: function() {
            return context;
        },

        //  Register all plugins
        init: function() {
            console.log('core.init');

            var plugins = pluginConfig.plugins || [];
            var context = SmartHouseCore.getContext();

            if (Array.isArray(plugins)) {
                plugins.forEach(function(plugin) {
                    if (!_.isFunction(plugin)) {
                        console.error('Plugin should return fucntion');
                        return;
                    }

                    var pluginInstance = plugin(context);

                    if (!pluginInstance.name || ! _.isFunction(pluginInstance.init) ||
                    ! _.isFunction(pluginInstance.start) || !_.isFunction(pluginInstance.stop)) {
                        console.error('Plugin does not support required interface');
                        return;
                    }
                    // Reqister plugin
                    _plugins.push(pluginInstance);
                });
            }

            _plugins.forEach(function(pluginInstance) {
                pluginInstance.init();
            });
        },

        start: function() {
            console.log('core.start');
            _plugins.forEach(function(pluginInstance) {
                pluginInstance.start();
            });
        },

        stop: function() {
            console.log('core.stop');
            _plugins.forEach(function(pluginInstance) {
                pluginInstance.stop();
            });
        },

        restart: function() {
            console.log('core.restart');
            SmartHouseCore.stop();
            SmartHouseCore.start();
        },

        destroy: function() {
            console.log('core.destroy');
            SmartHouseCore.stop();

            _plugins.forEach(function(pluginInstance) {
                pluginInstance.destroy();
            });
        }
    });

    return SmartHouseCore;
};
