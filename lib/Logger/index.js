const path = require('path');
const chalk = require('chalk');
const log4jsAdapter = require('./log4jsAdapter');

module.exports = class Logger {
    constructor(hint) {
        this._withStack = false;

        this._caller = this.getCaller.call(this);

        let callerFiles = this._caller.file.dir.split(path.sep);
        let description = `${callerFiles[callerFiles.length - 2]}/${callerFiles[callerFiles.length - 1]}/${this._caller.file.base}`;

        if (hint) description += ` - ${hint}`;

        this._logger = new log4jsAdapter(description);
        this._logger.level = process.env.NODE_ENV === 'development' ? 'trace' : 'info';
    }

    getCaller(n = 1) {
        let stack = new Error().stack;
        stack = stack.split('at ');
        stack.splice(1, 2);

        const fullStack = stack.join('at ');

        stack = stack[n].trim();
        stack = stack.match(/([\w.<>]+)\s?(\[[\w ]+\])?\s?\(([\w:.\\/-]+\.js):([0-9]+):([0-9]+)\)/);

        return {
            stack: fullStack,
            function: stack[1] + stack[2],
            file: path.parse(stack[3]),
            line: [stack[4], stack[5]],
        };
    }

    get withStack() {
        this._withStack = true;

        return this;
    }

    caller(name, ...args) {
        if (this._withStack) { args.push(this.getCaller.call(this).stack); this._withStack = false; }
        return this._logger[name](...args);
    }

    all(...args) { return this.caller('all', ...args); }
    trace(...args) { return this.caller('trace', ...args); }
    debug(...args) { return this.caller('debug', ...args); }
    success(text, ...args) { return this.caller('success', chalk.bold.green(`> ${text}`), ...args); }
    info(...args) { return this.caller('info', ...args); }
    warn(...args) { return this.caller('warn', ...args); }
    mark(...args) { return this.caller('mark', ...args); }
    off(...args) { return this.caller('off', ...args); }

    error(...args) {
        this._withStack = true;
        return this.caller('error', ...args);
    }

    fatal(...args) {
        this._withStack = true;
        return this.caller('fatal', ...args);
    }
};