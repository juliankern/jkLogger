const log4js = require('log4js');

log4js.configure({
    levels: {
        SUCCESS: { value: 19999, colour: 'green' },
    },
    appenders: {
        out: { type: 'stdout' },
        errors: {
            type: 'file',
            // TODO: globally define log file
            filename: 'logs/error.log',
            maxLogSize: 1024,
            backups: 5,
        },
        debugs: {
            type: 'file',
            // TODO: globally define log file
            filename: 'logs/debug.log',
            maxLogSize: 1024,
            backups: 5,
        },
        infos: {
            type: 'file',
            // TODO: globally define log file
            filename: 'logs/info.log',
            maxLogSize: 1024,
            backups: 5,
        },
        'just-errors': { type: 'logLevelFilter', appender: 'errors', level: 'warn' },
        'just-debug': { type: 'logLevelFilter', appender: 'debugs', level: 'debug', maxLevel: 'debug' },
        'just-info': { type: 'logLevelFilter', appender: 'infos', level: 'info', maxLevel: 'info' },
    },
    categories: {
        default: {
            appenders: ['out', 'just-errors', 'just-debug', 'just-info'],
            level: 'trace',
        },
    },
});

module.exports = class log4jsAdapter {
    constructor(description) {
        return log4js.getLogger(description);
    } 
}