'use strict';

var utils = require('@duplojs/utils');
var base = require('./base.cjs');
var errors = require('../errors.cjs');

function createOption(name, schema, params) {
    const dataParser = params?.required
        ? schema
        : utils.DP.optional(schema);
    return base.initOption(name, ({ isHere, value }) => {
        if (!isHere && params?.required) {
            throw new errors.CommandOptionRequiredError(name);
        }
        return dataParser.parseOrThrow(value);
    }, {
        description: params?.description,
        aliases: params?.aliases,
        hasValue: true,
    });
}

exports.createOption = createOption;
