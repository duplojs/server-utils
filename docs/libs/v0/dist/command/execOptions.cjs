'use strict';

var GG = require('@duplojs/utils/generator');
var OO = require('@duplojs/utils/object');
var error = require('./error.cjs');
var help = require('./help.cjs');
var getProcessArguments = require('../common/getProcessArguments.cjs');
var exitProcess = require('../common/exitProcess.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var GG__namespace = /*#__PURE__*/_interopNamespaceDefault(GG);
var OO__namespace = /*#__PURE__*/_interopNamespaceDefault(OO);

async function execOptions(...options) {
    const processArguments = getProcessArguments.getProcessArguments();
    const error$1 = error.createError("root");
    const help$1 = await help.helpOption.execute(processArguments, error$1);
    if (help$1 === error.SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(error.interpretExecOptionError(error$1));
        return void exitProcess.exitProcess(1);
    }
    else if (help$1.result) {
        help.logExecOptionHelp(options);
        return void exitProcess.exitProcess(0);
    }
    const result = await GG__namespace.asyncReduce(options, GG__namespace.reduceFrom({
        options: {},
        restArgs: processArguments,
    }), async ({ element: option, lastValue, next, exit }) => {
        const optionResult = await option.execute(lastValue.restArgs, error$1);
        if (optionResult === error.SymbolCommandError) {
            return exit(error.SymbolCommandError);
        }
        return next({
            options: OO__namespace.override(lastValue.options, {
                [option.name]: optionResult.result,
            }),
            restArgs: optionResult.argumentRest,
        });
    });
    if (result === error.SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(error.interpretExecOptionError(error$1));
        return void exitProcess.exitProcess(1);
    }
    return result.options;
}

exports.execOptions = execOptions;
