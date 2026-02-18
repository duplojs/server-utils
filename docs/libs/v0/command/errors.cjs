'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');

class CommandManyArgumentsError extends utils.kindHeritage("command-many-arguments-error", kind.createDuplojsServerUtilsKind("command-many-arguments-error"), Error) {
    restArgumentsLength;
    constructor(restArgumentsLength) {
        super({}, [`Expected exactly one subject argument, received ${restArgumentsLength}.`]);
        this.restArgumentsLength = restArgumentsLength;
    }
}
class CommandOptionValueLooksLikeOptionError extends utils.kindHeritage("command-option-value-looks-like-option-error", kind.createDuplojsServerUtilsKind("command-option-value-looks-like-option-error"), Error) {
    optionName;
    value;
    constructor(optionName, value) {
        super({}, [`Missing value for option "${optionName}": received another option token instead of a value.`]);
        this.optionName = optionName;
        this.value = value;
    }
}
class CommandOptionValueNotRequiredError extends utils.kindHeritage("command-option-value-not-required-error", kind.createDuplojsServerUtilsKind("command-option-value-not-required-error"), Error) {
    optionName;
    constructor(optionName) {
        super({}, [`Option "${optionName}" does not accept a value.`]);
        this.optionName = optionName;
    }
}
class CommandOptionRequiredError extends utils.kindHeritage("command-option-required-error", kind.createDuplojsServerUtilsKind("command-option-required-error"), Error) {
    optionName;
    constructor(optionName) {
        super({}, [`Option "${optionName}" is required.`]);
        this.optionName = optionName;
    }
}

exports.CommandManyArgumentsError = CommandManyArgumentsError;
exports.CommandOptionRequiredError = CommandOptionRequiredError;
exports.CommandOptionValueLooksLikeOptionError = CommandOptionValueLooksLikeOptionError;
exports.CommandOptionValueNotRequiredError = CommandOptionValueNotRequiredError;
