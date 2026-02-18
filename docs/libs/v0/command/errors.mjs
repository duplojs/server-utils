import { kindHeritage } from '@duplojs/utils';
import { createDuplojsServerUtilsKind } from '../kind.mjs';

class CommandManyArgumentsError extends kindHeritage("command-many-arguments-error", createDuplojsServerUtilsKind("command-many-arguments-error"), Error) {
    restArgumentsLength;
    constructor(restArgumentsLength) {
        super({}, [`Expected exactly one subject argument, received ${restArgumentsLength}.`]);
        this.restArgumentsLength = restArgumentsLength;
    }
}
class CommandOptionValueLooksLikeOptionError extends kindHeritage("command-option-value-looks-like-option-error", createDuplojsServerUtilsKind("command-option-value-looks-like-option-error"), Error) {
    optionName;
    value;
    constructor(optionName, value) {
        super({}, [`Missing value for option "${optionName}": received another option token instead of a value.`]);
        this.optionName = optionName;
        this.value = value;
    }
}
class CommandOptionValueNotRequiredError extends kindHeritage("command-option-value-not-required-error", createDuplojsServerUtilsKind("command-option-value-not-required-error"), Error) {
    optionName;
    constructor(optionName) {
        super({}, [`Option "${optionName}" does not accept a value.`]);
        this.optionName = optionName;
    }
}
class CommandOptionRequiredError extends kindHeritage("command-option-required-error", createDuplojsServerUtilsKind("command-option-required-error"), Error) {
    optionName;
    constructor(optionName) {
        super({}, [`Option "${optionName}" is required.`]);
        this.optionName = optionName;
    }
}

export { CommandManyArgumentsError, CommandOptionRequiredError, CommandOptionValueLooksLikeOptionError, CommandOptionValueNotRequiredError };
