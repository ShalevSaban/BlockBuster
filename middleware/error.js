const winston = require('winston');

function errorFunc(err, req, res, next) {
    winston.error(err.message, err);
}

module.exports.error = errorFunc;