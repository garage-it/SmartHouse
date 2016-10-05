const _ = require('lodash');
const Promise = require('bluebird');

module.exports = function(config) {
    return function(context) {
        const plugin = {};
        Object.assign(plugin, {
            name: 'smart-house-frontend',
            init: _init.bind(plugin, config, context),
            start: _.noop,
            stop: _.noop,
            destroy: _.noop
        });
        return plugin;
    };
};

function _init(config, context) {
    // @FIXME
    // Move this file to frontend project
    // Detect this path based on current file position
    if (!config.PATH_FRONTENT_DIST) {
        return Promise.reject(this.name + ': Frontend path is not specified ');
    }
    // @TODO
    // - check path
    // - enshure it's builded
    context.setStaticMountPoint(config.PATH_FRONTENT_DIST || '');
}
