const _ = require('lodash');
const Promise = require('bluebird');

module.exports = function(pluginConfig, program) {

    const _plugins = [];
    const SmartHouseCore = {};
    const Commander = program;

    const context = require('./context')(pluginConfig.configuration || {}, SmartHouseCore, Commander);

    Object.assign(SmartHouseCore,  {

        getContext: function() {
            return context;
        },

        getInitPromise: function() {
            if (! SmartHouseCore.initResult) {
                SmartHouseCore.initResult = InitSmartHouseCore();
            }
            return SmartHouseCore.initResult;
        },

        start: function() {
            return SmartHouseCore.getInitPromise().then(function() {
                return runPluginSequence(_plugins, 'start');
            });
        },

        stop: function() {
            return SmartHouseCore.getInitPromise().then(function() {
                return runPluginSequence(_plugins, 'stop');
            });
        },

        restart: function() {
            return SmartHouseCore.getInitPromise().then(function() {
                return runPluginSequence(_plugins, 'stop');
            }).then(function() {
                return runPluginSequence(_plugins, 'start');
            });
        },

        destroy: function() {
            return SmartHouseCore.getInitPromise().then(function() {
                return runPluginSequence(_plugins, 'stop');
            }).then(function() {
                return runPluginSequence(_plugins, 'destroy');
            });
        }
    });


    function InitSmartHouseCore() {
        var plugins = pluginConfig.plugins || [];
        var context = SmartHouseCore.getContext();

        if (!Array.isArray(plugins)) {
            return Promise.reject('Plugins expected to be array');
        }

        // Inititalize plugins: check (@TODO: refactor following code)
        return Promise.all(plugins.map(function(plugin) {
            if (!_.isFunction(plugin)) {
                return Promise.reject('Plugin should return fucntion');
            }

            var pluginInstance = plugin(context);

            if (!pluginInstance.name || ! _.isFunction(pluginInstance.init) ||
            ! _.isFunction(pluginInstance.start) || !_.isFunction(pluginInstance.stop)) {
                return Promise.reject('Plugin ' + (pluginInstance.name || '') + 'does not support required interface');
            }

            _plugins.push(pluginInstance);
            return Promise.resolve();

        })).then(function() {
            return runPluginSequence(_plugins, 'init');
        });
    }

    return SmartHouseCore;
};

function runPluginSequence(pluginList, method) {
    return pluginList.reduce(function(cur, pluginInstance) {
        if (pluginInstance[method]) {
            return cur.then(pluginInstance[method]).then(function() {
                if (!isEmptyFunction(pluginInstance[method])) {
                    /* eslint-disable no-console */
                    console.log(pluginInstance.name + ': ' + method + ' ' + '\u2713'.green);
                    /* eslint-enable no-console */
                }
            });
        }
        return cur;
    }, Promise.resolve());
}

// Is Function epmty
function isEmptyFunction(fn) {
    return (fn.toString().replace(/\s+/g,'').replace(/\n/g,'') === 'function(){}' || fn === _.noop);
}
