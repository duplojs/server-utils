'use strict';

var utils = require('@duplojs/utils');
var printer = require('./printer.cjs');

function formatSubject(subject) {
    return utils.P.match(subject)
        .when(utils.DP.identifier(utils.DP.stringKind), utils.justReturn("string"))
        .when(utils.DP.identifier(utils.DP.numberKind), utils.justReturn("number"))
        .when(utils.DP.identifier(utils.DP.bigIntKind), utils.justReturn("bigint"))
        .when(utils.DP.identifier(utils.DP.dateKind), utils.justReturn("date"))
        .when(utils.DP.identifier(utils.DP.timeKind), utils.justReturn("time"))
        .when(utils.DP.identifier(utils.DP.nilKind), utils.justReturn("null"))
        .when(utils.DP.identifier(utils.DP.literalKind), (subject) => utils.pipe(subject.definition.value, utils.A.map(String), utils.A.join(" | ")))
        .when(utils.DP.identifier(utils.DP.templateLiteralKind), (subject) => utils.pipe(subject.definition.template, utils.A.map((part) => utils.DP.identifier(part, utils.DP.dataParserKind)
        ? `\${${formatSubject(part)}}`
        : String(part)), utils.A.join("")))
        .when(utils.DP.identifier(utils.DP.unionKind), (subject) => utils.pipe(subject.definition.options, utils.A.map(formatSubject), utils.A.join(" | ")))
        .when(utils.DP.identifier(utils.DP.arrayKind), (subject) => `${formatSubject(subject.definition.element)}[]`)
        .when(utils.DP.identifier(utils.DP.tupleKind), (subject) => {
        const parts = utils.pipe(subject.definition.shape, utils.A.map(formatSubject), utils.A.join(", "));
        const rest = subject.definition.rest
            ? `${parts ? ", " : ""}...${formatSubject(subject.definition.rest)}[]`
            : "";
        return `[${parts}${rest}]`;
    })
        .otherwise(utils.justReturn("unknown"));
}
function logHelp(command, depth = 0) {
    printer.Printer.render([
        printer.Printer.indent(depth),
        printer.Printer.colorized("NAME:", "GREEN"),
        command.name,
    ]);
    if (command.description) {
        printer.Printer.render([
            printer.Printer.indent(depth + 1),
            printer.Printer.colorized("DESCRIPTION:", "CYAN"),
            printer.Printer.back,
            printer.Printer.indent(depth + 1),
            command.description,
        ]);
    }
    if (utils.A.minElements(command.options, 1)) {
        const optionLines = [];
        command.options.forEach((option, index) => {
            optionLines.push(printer.Printer.indent(depth + 1), printer.Printer.dash, printer.Printer.colorized(` ${option.name}: `, "cyan"), printer.Printer.colorizedOption(option, "gray"));
            if (option.description) {
                optionLines.push(printer.Printer.back, printer.Printer.indent(depth + 1), `   ${option.description}`);
            }
            if (index < command.options.length - 1) {
                optionLines.push(printer.Printer.back);
            }
        });
        printer.Printer.render([
            printer.Printer.indent(depth + 1),
            printer.Printer.colorized("OPTIONS:", "BLUE"),
            printer.Printer.back,
            ...optionLines,
        ]);
    }
    if (utils.isType(command.subject, "array")) {
        for (const childCommand of command.subject) {
            logHelp(childCommand, depth + 1);
        }
    }
    else if (utils.DP.identifier(command.subject, utils.DP.dataParserKind)) {
        const formattedSubject = formatSubject(command.subject);
        printer.Printer.render([
            printer.Printer.indent(depth + 1),
            printer.Printer.colorized("SUBJECT:", "MAGENTA"),
            utils.hasSomeKinds(command.subject, [utils.DP.tupleKind, utils.DP.arrayKind])
                ? formattedSubject
                : `<${formattedSubject}>`,
        ]);
    }
}

exports.logHelp = logHelp;
