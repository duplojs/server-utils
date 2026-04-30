'use strict';

var index = require('./create/index.cjs');
var error = require('./error.cjs');
var getProcessArguments = require('../common/getProcessArguments.cjs');
var exitProcess = require('../common/exitProcess.cjs');

async function exec(...args) {
    const [params, execute] = args.length === 1
        ? [{}, args[0]]
        : args;
    const error$1 = error.createError("root");
    const result = await index.create("root", params, execute).execute(getProcessArguments.getProcessArguments(), error$1);
    if (result === error.SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(error.interpretCommandError(error$1));
        return void exitProcess.exitProcess(1);
    }
}

exports.exec = exec;
