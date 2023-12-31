const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');


module.exports = function() {


    winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
        new winston.transports.Console({ colorize: true, prettyPrint: true }));

    process.on('unhandledRejection', (ex) => { throw ex; })

    winston.add(new winston.transports.File({ filename: "logfile.log", level: "error" }));



}