const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = function(config) {
    // context
    return function(context) {
        const plugin = {};
        Object.assign(plugin, {
            name: 'smart-house-db-check',
            init: _init.bind(plugin, config, context),
            start: _.noop,
            stop: _.noop,
            destroy: _.noop
        });
        return plugin;
    };
};

function _init(config, context) {
    var coreConfig = context.getConfig();

    return new Promise(function(resolve, reject) {
        MongoClient.connect(coreConfig.MONGO, function(err, db) {
            if (db) {
                db.close();
            }
            if (err || !db) {
                var isWin = /^win/.test(process.platform);
                if (isWin) {
                    reject('Connection to MongoDB failed.\n' + 'Connection string: ' + coreConfig.MONGO + '\n' +
                    'Most likely you forgot to run mongo\n'+
                    'e.g. to run mongo: c:\\Program Files\\MongoDB\\Server\\3.2\\bin\\mongod.exe');
                } else {
                    reject('Connection to MongoDB failed.\n' + 'Connection string: ' + coreConfig.MONGO + '\n' +
                    'Most likely you forgot to run mongo\n'+
                    'e.g. to run mongo: sudo service mongodb start');
                }
            }
            resolve();
        });
    });
}
