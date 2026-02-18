'use strict';

var utils = require('@duplojs/utils');
var base = require('./base.cjs');
var errors = require('../errors.cjs');

const defaultSeparator = ",";
function createArrayOption(name, schema, params) {
    const dataParser = utils.pipe(schema, utils.DP.array, (schema) => params?.min
        ? schema.addChecker(utils.DP.checkerArrayMin(params.min))
        : schema, (schema) => params?.max
        ? schema.addChecker(utils.DP.checkerArrayMax(params.max))
        : schema, (schema) => params?.required
        ? schema
        : utils.DP.optional(schema));
    return base.initOption(name, ({ isHere, value }) => {
        if (!isHere && params?.required) {
            throw new errors.CommandOptionRequiredError(name);
        }
        const values = value !== undefined
            ? utils.S.split(value, params?.separator ?? defaultSeparator)
            : undefined;
        return dataParser.parseOrThrow(values);
    }, {
        description: params?.description,
        aliases: params?.aliases,
        hasValue: true,
    });
}

exports.createArrayOption = createArrayOption;
