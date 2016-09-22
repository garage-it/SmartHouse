module.exports = function(config) {
    // context
    return function(context) {
        return {
            name: 'smart-house-backend',
            init: _init.bind(this, config, context),
            start: _start.bind(this, config, context),
            stop: _stop.bind(this, config, context)
        }
    };
};

function _init(config, context) {

}

function _start(config, context) {
}

function _stop(config, context) {
}
