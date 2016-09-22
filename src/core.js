const context = require('./context');
const pluginConfig = require('./smart-house');
const _ = require('underscore');

const _plugins = [];
const _options = {};

const SmartHouseCore = {
    // public interface
    getContext: function() {
        return context;
    },

    //  Register all plugins
    init: function() {
        var plugins = pluginConfig().plugins || [];
        var context = SmartHouseCore.getContext();

        if (Array.isArray()) {
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
            console.log('Initialize ' + pluginInstance.name + '.... ');
            pluginInstance.init();
        });
    },

    start: function() {
        _plugins.forEach(function(pluginInstance) {
            console.log('Starting ' + pluginInstance.name);
            pluginInstance.start();
        });
    },

    stop: function() {
        _plugins.forEach(function(pluginInstance) {
            console.log('Stoping ' + pluginInstance.name);
            pluginInstance.stop();
        });
    },

    restart: function() {
        SmartHouseCore.stop();
        SmartHouseCore.start();
    }
};


module.export = SmartHouseCore;
