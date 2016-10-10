const EventEmitter = require('events');
const defaultConfig = require('./configuration');
const exec = require('shelljs').exec;
const pm2 = require('pm2');

// In mood
module.exports = function(config, core /*, commander */) {

    const configuration = Object.assign({}, defaultConfig, config);
    const eventBus = new EventEmitter();

    // Init
    eventBus.on('restart', function() {
        core.restart();
    });

    const context = {
        /**
        *  Will stop the script (will use node exec or PM2)
        */
        startScript: function(pluginName, script, command, params) {
            /* eslint-disable no-console */
            console.log('Start (' + pluginName + '): ' + script);
            /* eslint-enable no-console */
            if (config.EXEC_MODE === 'node') {
                // Run program in fork mode:
                return new Promise(function(resolve, reject) {
                    context.stopScript(pluginName, script).then(function() {
                        var shellcmd = 'node "' + script + '" ' + command + ' ' + paramsToString(params);
                        exec(shellcmd, {async: true, silent: !config.EXEC_LOGS});
                        resolve();
                    }).catch(reject);
                });
            } else {
                return new Promise(function(resolve, reject) {
                    // console.log('Connecting to PM2');
                    pm2.connect(function(err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        pm2.start({ script: script, name: pluginName, args: command + '  ' + paramsToString(params) }, function (err) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (config.EXEC_LOGS) {
                                pm2.launchBus(function(err, bus) {
                                    /* eslint-disable no-console */
                                    console.log('[PM2] Log streaming started');
                                    /* eslint-enable no-console */
                                    bus.on('log:out', function(packet) {
                                        /* eslint-disable no-console */
                                        console.log('[App:%s] %s', packet.process.name, packet.data);
                                        /* eslint-enable no-console */
                                    });
                                    bus.on('log:err', function(packet) {
                                        /* eslint-disable no-console */
                                        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
                                        /* eslint-enable no-console */
                                    });
                                });
                            } else {
                                pm2.disconnect();
                            }
                            resolve();
                        });
                    });
                });
            }
        },

        /**
        *   Will stop the script (will use PM2)
        */
        stopScript: function(pluginName /*,script */) {
            return new Promise(function(resolve, reject) {
                pm2.connect(function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    pm2.delete(pluginName, function (err) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        pm2.disconnect();
                        resolve();
                    });
                });
            });
        },

        setStaticFilesPath: function(location) {
            context.setConfigValue('PATH_FRONTENT_DIST', location);
        },

        getConfig: function() {
            return configuration;
        },

        setConfigValue(key, value) {
            configuration[key] = value;
        }
    };

    return context;
};

function paramsToString(params) {
    return  Object.keys(params).reduce(function(previousValue, currentValue) {
        return currentValue === false ? previousValue : (previousValue  + '  --' + currentValue + ' ' + params[currentValue]);
    }, '');
}
