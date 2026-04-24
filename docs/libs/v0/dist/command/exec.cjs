'use strict';

var create = require('./create.cjs');
var getProcessArguments = require('../common/getProcessArguments.cjs');

async function exec(...args) {
    const [params, execute] = args.length === 1
        ? [{}, args[0]]
        : args;
    await create.create("root", params, execute).execute(getProcessArguments.getProcessArguments());
}

exports.exec = exec;
