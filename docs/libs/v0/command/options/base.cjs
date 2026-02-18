'use strict';

var utils = require('@duplojs/utils');
var kind = require('../../kind.cjs');
var errors = require('../errors.cjs');

const optionKind = kind.createDuplojsServerUtilsKind("command-option");
const regexOption = /^(?<dashes>-{1,2})(?<key>[A-Za-z0-9][A-Za-z0-9_-]*)(?:=(?<value>.*))?$/;
function initOption(name, execute, params) {
    const self = optionKind.setTo({
        name,
        execute: (args) => {
            const result = utils.A.reduce(args, utils.A.reduceFrom(null), ({ element, next, exit, index }) => {
                const extractResult = utils.S.extract(element, regexOption);
                if (!extractResult) {
                    return next(null);
                }
                const result = {
                    key: extractResult.namedGroups.key,
                    value: extractResult.namedGroups?.value,
                    index,
                };
                if (self.name !== result.key && !utils.A.includes(self.aliases, result.key)) {
                    return next(null);
                }
                return exit(result);
            });
            if (!result) {
                return {
                    result: execute({
                        isHere: false,
                        value: undefined,
                    }),
                    argumentRest: args,
                };
            }
            else if (self.hasValue) {
                const value = result.value ?? args[result.index + 1];
                const isOption = utils.S.test(value ?? "", regexOption);
                if (isOption) {
                    throw new errors.CommandOptionValueLooksLikeOptionError(self.name, value);
                }
                return {
                    result: execute({
                        isHere: true,
                        value,
                    }),
                    argumentRest: utils.A.spliceDelete(args, result.index, result.value === undefined && args[result.index + 1] !== undefined
                        ? 2
                        : 1),
                };
            }
            else if (!self.hasValue && result.value !== undefined) {
                throw new errors.CommandOptionValueNotRequiredError(self.name);
            }
            return {
                result: execute({
                    isHere: true,
                    value: undefined,
                }),
                argumentRest: utils.A.spliceDelete(args, result.index, 1),
            };
        },
        aliases: params?.aliases ?? [],
        description: params?.description ?? null,
        hasValue: params?.hasValue ?? false,
    });
    return self;
}

exports.initOption = initOption;
