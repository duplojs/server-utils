'use strict';

var utils = require('@duplojs/utils');
var AA = require('@duplojs/utils/array');
var PP = require('@duplojs/utils/pattern');
var DDP = require('@duplojs/utils/dataParser');
var boolean = require('./options/boolean.cjs');
var file = require('../dataParser/parsers/file.cjs');

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
function formatSubject(subject) {
    return PP__namespace.match(subject)
        .when(DDP__namespace.identifier(DDP__namespace.stringKind), utils.justReturn("string"))
        .when(DDP__namespace.identifier(DDP__namespace.numberKind), utils.justReturn("number"))
        .when(DDP__namespace.identifier(DDP__namespace.bigIntKind), utils.justReturn("bigint"))
        .when(DDP__namespace.identifier(DDP__namespace.dateKind), utils.justReturn("date"))
        .when(DDP__namespace.identifier(DDP__namespace.timeKind), utils.justReturn("time"))
        .when(DDP__namespace.identifier(DDP__namespace.nilKind), utils.justReturn("null"))
        .when(file.fileKind.has, utils.justReturn("file"))
        .when(DDP__namespace.identifier(DDP__namespace.literalKind), (subject) => utils.pipe(subject.definition.value, AA__namespace.map(String), AA__namespace.join(" | ")))
        .when(DDP__namespace.identifier(DDP__namespace.templateLiteralKind), (subject) => utils.pipe(subject.definition.template, AA__namespace.map((part) => DDP__namespace.identifier(part, DDP__namespace.dataParserKind)
        ? `\${${formatSubject(part)}}`
        : String(part)), AA__namespace.join("")))
        .when(DDP__namespace.identifier(DDP__namespace.unionKind), (subject) => utils.pipe(subject.definition.options, AA__namespace.map(formatSubject), AA__namespace.join(" | ")))
        .when(DDP__namespace.identifier(DDP__namespace.transformKind), (subject) => formatSubject(subject.definition.inner))
        .when(DDP__namespace.identifier(DDP__namespace.pipeKind), (subject) => formatSubject(subject.definition.input))
        .when(DDP__namespace.identifier(DDP__namespace.optionalKind), (subject) => `${formatSubject(subject.definition.inner)}?`)
        .when(DDP__namespace.identifier(DDP__namespace.arrayKind), (subject) => `${formatSubject(subject.definition.element)}[]`)
        .when(DDP__namespace.identifier(DDP__namespace.tupleKind), (subject) => {
        const parts = utils.pipe(subject.definition.shape, AA__namespace.map(formatSubject), AA__namespace.join(", "));
        const rest = subject.definition.rest
            ? `${parts ? ", " : ""}...${formatSubject(subject.definition.rest)}[]`
            : "";
        return `[${parts}${rest}]`;
    })
        .otherwise(utils.justReturn("unknown"));
}
function renderOptionsHelp(options, depth) {
    return utils.Printer.renderParagraph([
        `${utils.Printer.indent(depth)}${utils.Printer.colorizedBold("OPTIONS:", "blue")}`,
        AA__namespace.map(options, (option) => utils.Printer.renderParagraph([
            AA__namespace.join([
                utils.Printer.indent(depth),
                utils.Printer.dash,
                utils.Printer.colorized(` ${option.name}: `, "cyan"),
                utils.Printer.colorized(utils.pipe(option.aliases, AA__namespace.map((alias) => `-${alias},`), AA__namespace.push(`--${option.name}`), AA__namespace.join(" ")), "gray"),
            ], ""),
            option.description
                && `${utils.Printer.indent(depth)}  ${option.description}`,
        ])),
    ]);
}
function renderCommandHelp(command, depth) {
    const logs = [];
    logs.push(`${utils.Printer.indent(depth)}${utils.Printer.colorizedBold("NAME:", "green")}${command.name}`);
    if (command.description) {
        logs.push(utils.Printer.renderParagraph([
            `${utils.Printer.indent(depth + 1)}${utils.Printer.colorizedBold("DESCRIPTION:", "cyan")}`,
            `${utils.Printer.indent(depth + 1)}${command.description}`,
        ]));
    }
    if (AA__namespace.minElements(command.options, 1)) {
        logs.push(renderOptionsHelp(command.options, depth + 1));
    }
    if (command.children?.type === "subCommand") {
        for (const subCommand of command.children.subCommands) {
            logs.push(...renderCommandHelp(subCommand, depth + 1));
        }
    }
    else if (command.children?.type === "subject") {
        const formattedSubject = formatSubject(command.children.dataParser);
        logs.push(AA__namespace.join([
            utils.Printer.indent(depth + 1),
            utils.Printer.colorizedBold("SUBJECT:", "magenta"),
            utils.hasSomeKinds(command.children.dataParser, [DDP__namespace.tupleKind, DDP__namespace.arrayKind])
                ? formattedSubject
                : `<${formattedSubject}>`,
        ], ""));
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

exports.formatSubject = formatSubject;
exports.helpOption = helpOption;
exports.logCommandHelp = logCommandHelp;
exports.logExecOptionHelp = logExecOptionHelp;
exports.renderCommandHelp = renderCommandHelp;
exports.renderExecOptionHelp = renderExecOptionHelp;
exports.renderOptionsHelp = renderOptionsHelp;
