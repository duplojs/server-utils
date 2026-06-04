'use strict';

var utils = require('@duplojs/utils');
var AA = require('@duplojs/utils/array');
var PP = require('@duplojs/utils/pattern');
var DDP = require('@duplojs/utils/dataParser');
var boolean = require('./options/boolean.cjs');
var simple = require('./options/simple.cjs');
var array = require('./options/array.cjs');
var index = require('../dataParser/parsers/file/index.cjs');

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
var PP__namespace = /*#__PURE__*/_interopNamespaceDefault(PP);
var DDP__namespace = /*#__PURE__*/_interopNamespaceDefault(DDP);

const helpOption = boolean.createBooleanOption("help", { aliases: ["h"] });
function formatDataParser(dataParser) {
    return PP__namespace.match(dataParser)
        .when(DDP__namespace.identifier(DDP__namespace.stringKind), utils.justReturn("string"))
        .when(DDP__namespace.identifier(DDP__namespace.numberKind), utils.justReturn("number"))
        .when(DDP__namespace.identifier(DDP__namespace.bigIntKind), utils.justReturn("bigint"))
        .when(DDP__namespace.identifier(DDP__namespace.dateKind), utils.justReturn("date"))
        .when(DDP__namespace.identifier(DDP__namespace.timeKind), utils.justReturn("time"))
        .when(DDP__namespace.identifier(DDP__namespace.nilKind), utils.justReturn("null"))
        .when(index.fileKind.has, utils.justReturn("file"))
        .when(DDP__namespace.identifier(DDP__namespace.literalKind), (subject) => utils.pipe(subject.definition.value, AA__namespace.map(String), AA__namespace.join(" | ")))
        .when(DDP__namespace.identifier(DDP__namespace.templateLiteralKind), (dataParser) => utils.pipe(dataParser.definition.template, AA__namespace.map((part) => DDP__namespace.identifier(part, DDP__namespace.dataParserKind)
        ? `\${${formatDataParser(part)}}`
        : String(part)), AA__namespace.join("")))
        .when(DDP__namespace.identifier(DDP__namespace.unionKind), (dataParser) => utils.pipe(dataParser.definition.options, AA__namespace.map(formatDataParser), AA__namespace.join(" | ")))
        .when(DDP__namespace.identifier(DDP__namespace.transformKind), (dataParser) => formatDataParser(dataParser.definition.inner))
        .when(DDP__namespace.identifier(DDP__namespace.pipeKind), (dataParser) => formatDataParser(dataParser.definition.input))
        .when(DDP__namespace.identifier(DDP__namespace.optionalKind), (dataParser) => `${formatDataParser(dataParser.definition.inner)}?`)
        .when(DDP__namespace.identifier(DDP__namespace.arrayKind), (dataParser) => `${formatDataParser(dataParser.definition.element)}[]`)
        .when(DDP__namespace.identifier(DDP__namespace.tupleKind), (dataParser) => {
        const parts = utils.pipe(dataParser.definition.shape, AA__namespace.map(formatDataParser), AA__namespace.join(", "));
        const rest = dataParser.definition.rest
            ? `${parts ? ", " : ""}...${formatDataParser(dataParser.definition.rest)}[]`
            : "";
        return `[${parts}${rest}]`;
    })
        .otherwise(utils.justReturn("unknown"));
}
function getOptionMetadata(option) {
    if (!simple.simpleOptionKind.has(option)
        && !array.arrayOptionKind.has(option)) {
        return null;
    }
    const metadata = [`[${formatDataParser(option.dataParser)}]`];
    if (option.required) {
        metadata.push("required");
    }
    return metadata.join(" ");
}
function renderOptionsHelp(options, depth) {
    return utils.Printer.renderParagraph([
        `${utils.Printer.indent(depth)}${utils.Printer.colorizedBold("OPTIONS:", "blue")}`,
        AA__namespace.map(options, (option) => {
            const optionMetadata = getOptionMetadata(option);
            return utils.Printer.renderParagraph([
                utils.Printer.renderLine([
                    utils.Printer.indent(depth),
                    utils.Printer.dash,
                    utils.Printer.colorized(`${option.name}:`, "cyan"),
                    utils.Printer.colorized(utils.pipe(option.aliases, AA__namespace.map((alias) => `-${alias},`), AA__namespace.push(`--${option.name}`), AA__namespace.join(" ")), "gray"),
                    optionMetadata && utils.Printer.colorized(optionMetadata, "gray"),
                ]),
                option.description && `${utils.Printer.indent(depth)}  ${option.description}`,
            ]);
        }),
    ]);
}
function renderArgumentsHelp(args, depth) {
    return utils.Printer.renderParagraph([
        utils.Printer.renderLine([
            utils.Printer.indent(depth),
            utils.Printer.colorizedBold("ARGUMENTS:", "magenta"),
            utils.Printer.colorized(utils.pipe(args, AA__namespace.map((argument) => argument.optional ? `<?${argument.name}>` : `<${argument.name}>`), AA__namespace.join(" ")), "gray"),
        ]),
        AA__namespace.map(args, (argument) => utils.Printer.renderParagraph([
            utils.Printer.renderLine([
                utils.Printer.indent(depth),
                utils.Printer.dash,
                utils.Printer.colorized(`${argument.name}:`, "cyan"),
                utils.Printer.colorized(argument.optional
                    ? `${formatDataParser(argument.dataParser)} | undefined`
                    : formatDataParser(argument.dataParser), "gray"),
            ]),
            argument.description
                && `${utils.Printer.indent(depth)}  ${argument.description}`,
        ])),
    ]);
}
function renderCommandHelp(command, depth) {
    const logs = [];
    logs.push(`${utils.Printer.indent(depth)}${utils.Printer.colorizedBold("COMMAND:", "green")} ${command.name}`);
    if (command.description) {
        logs.push(utils.Printer.renderParagraph([
            `${utils.Printer.indent(depth + 1)}${utils.Printer.colorizedBold("DESCRIPTION:", "cyan")}`,
            `${utils.Printer.indent(depth + 1)}${command.description}`,
        ]));
    }
    if (AA__namespace.minElements(command.options, 1)) {
        logs.push(renderOptionsHelp(command.options, depth + 1));
    }
    if (command.subject?.type === "subCommand") {
        for (const subCommand of command.subject.subCommands) {
            logs.push(...renderCommandHelp(subCommand, depth + 1));
        }
    }
    else if (command.subject?.type === "argument") {
        logs.push(renderArgumentsHelp(command.subject.args, depth + 1));
    }
    return logs;
}
function logCommandHelp(command) {
    // eslint-disable-next-line no-console
    console.log(utils.Printer.renderParagraph(renderCommandHelp(command, 0)));
}
function renderExecOptionHelp(options, depth) {
    return [
        `${utils.Printer.indent(depth)}${utils.Printer.colorizedBold("OPTION HELP", "green")}`,
        renderOptionsHelp(options, depth + 1),
    ];
}
function logExecOptionHelp(options) {
    // eslint-disable-next-line no-console
    console.log(utils.Printer.renderParagraph(renderExecOptionHelp(options, 0)));
}

exports.formatDataParser = formatDataParser;
exports.helpOption = helpOption;
exports.logCommandHelp = logCommandHelp;
exports.logExecOptionHelp = logExecOptionHelp;
exports.renderArgumentsHelp = renderArgumentsHelp;
exports.renderCommandHelp = renderCommandHelp;
exports.renderExecOptionHelp = renderExecOptionHelp;
exports.renderOptionsHelp = renderOptionsHelp;
