import * as AA from '@duplojs/utils/array';
import * as SS from '@duplojs/utils/string';
import { createDuplojsServerUtilsKind } from '../../kind.mjs';
import { SymbolCommandError, addIssue } from '../error.mjs';

const optionKind = createDuplojsServerUtilsKind("command-option");
const regexOption = /^(?<dashes>-{1,2})(?<key>[A-Za-z0-9][A-Za-z0-9_-]*)(?:=(?<value>.*))?$/;
function initOption(name, execute, params) {
    const self = optionKind.setTo({
        name,
        execute: (args, error) => {
            const result = AA.reduce(args, AA.reduceFrom(null), ({ element, next, exit, index }) => {
                const extractResult = SS.extract(element, regexOption);
                if (!extractResult) {
                    return next(null);
                }
                const result = {
                    key: extractResult.namedGroups.key,
                    value: extractResult.namedGroups?.value,
                    index,
                };
                if (self.name !== result.key && !AA.includes(self.aliases, result.key)) {
                    return next(null);
                }
                return exit(result);
            });
            if (!result) {
                const executeResult = execute({
                    isHere: false,
                    value: undefined,
                }, error);
                if (executeResult === SymbolCommandError) {
                    return SymbolCommandError;
                }
                return {
                    result: executeResult,
                    argumentRest: args,
                };
            }
            else if (self.hasValue) {
                const value = result.value ?? args[result.index + 1];
                const isOption = SS.test(value ?? "", regexOption);
                if (isOption) {
                    return addIssue(error, {
                        type: "option",
                        target: self.name,
                        expected: `value for option --${self.name}`,
                        received: value,
                        message: `Missing value for option "${self.name}": received another option token instead of a value.`,
                    });
                }
                const executeResult = execute({
                    isHere: true,
                    value,
                }, error);
                if (executeResult === SymbolCommandError) {
                    return SymbolCommandError;
                }
                return {
                    result: executeResult,
                    argumentRest: AA.spliceDelete(args, result.index, result.value === undefined && args[result.index + 1] !== undefined
                        ? 2
                        : 1),
                };
            }
            else if (!self.hasValue && result.value !== undefined) {
                return addIssue(error, {
                    type: "option",
                    target: self.name,
                    expected: `option without value --${self.name}`,
                    received: result.value,
                    message: `Option "${self.name}" does not accept a value.`,
                });
            }
            const executeResult = execute({
                isHere: true,
                value: undefined,
            }, error);
            if (executeResult === SymbolCommandError) {
                return SymbolCommandError;
            }
            return {
                result: executeResult,
                argumentRest: AA.spliceDelete(args, result.index, 1),
            };
        },
        aliases: params?.aliases ?? [],
        description: params?.description ?? null,
        hasValue: params?.hasValue ?? false,
    });
    return self;
}

export { initOption };
