'use strict';

var AA = require('@duplojs/utils/array');
var OO = require('@duplojs/utils/object');
var error = require('./error.cjs');
var help = require('./help.cjs');
var exitProcess = require('../common/exitProcess.cjs');
var getProcessArguments = require('../common/getProcessArguments.cjs');
var boolean = require('./options/boolean.cjs');

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

var AA__namespace = /*#__PURE__*/_interopNamespaceDefault(AA);
var OO__namespace = /*#__PURE__*/_interopNamespaceDefault(OO);

const helpOption = boolean.createBooleanOption("help", { aliases: ["h"] });
function execOptions(...options) {
    const processArguments = getProcessArguments.getProcessArguments();
    const error$1 = error.createError("root");
    const help$1 = helpOption.execute(processArguments, error$1);
    if (help$1 === error.SymbolCommandError) {
        // eslint-disable-next-line no-console
        console.error(error.interpretExecOptionError(error$1));
        return void exitProcess.exitProcess(1);
    }
    else if (help$1.result) {
        help.logExecOptionHelp(options);
        return void exitProcess.exitProcess(0);
    }
    const result = AA__namespace.reduce(options, AA__namespace.reduceFrom({
        options: {},
        restArgs: processArguments,
    }), ({ element: option, lastValue, next, exit }) => {
        const optionResult = option.execute(lastValue.restArgs, error$1);
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
