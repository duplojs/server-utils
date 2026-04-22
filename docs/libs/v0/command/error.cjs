'use strict';

var utils = require('@duplojs/utils');

const SymbolCommandError = Symbol.for("SymbolCommandError");
function createError(commandName) {
    return {
        issues: [],
        currentCommandPath: [commandName],
    };
}
function addIssue(error, issue) {
    error.issues.push({
        ...issue,
        commandPath: [...error.currentCommandPath],
    });
    return SymbolCommandError;
}
function setErrorPath(error, value, index) {
    error.currentCommandPath[index] = value;
    return error;
}
function popErrorPath(error) {
    error.currentCommandPath.pop();
    return error;
}
function addDataParserError(error, parseError, params) {
    for (const issue of parseError.issues) {
        error.issues.push({
            type: params.type,
            commandPath: [...error.currentCommandPath],
            target: params.target,
            parserPath: issue.path || undefined,
            expected: issue.expected,
            received: issue.data,
            message: issue.message,
        });
    }
    return SymbolCommandError;
}
function interpretCommandError(error) {
    return utils.Printer.renderParagraph([
        utils.Printer.render([
            utils.Printer.colorizedBold("Command failed", "red"),
            utils.Printer.back,
            utils.Printer.indent(1),
            utils.Printer.colorizedBold("COMMAND: ", "cyan"),
            error.issues[0]?.commandPath.join(" ") ?? error.currentCommandPath.join(" "),
        ], ""),
        error.issues.map((issue) => utils.Printer.renderParagraph([
            issue.type === "option"
                && issue.target
                && utils.Printer.render([
                    utils.Printer.indent(1),
                    utils.Printer.colorizedBold("OPTION: ", "magenta"),
                    `--${issue.target}`,
                ], ""),
            issue.type === "subject"
                && issue.parserPath
                && utils.Printer.render([
                    utils.Printer.indent(1),
                    utils.Printer.colorizedBold("SUBJECT:", "magenta"),
                ], ""),
            utils.Printer.renderLine([
                utils.Printer.colorizedBold("✖", "red"),
                issue.parserPath && utils.Printer.colorizedBold(issue.parserPath, "cyan"),
                "expected",
                utils.Printer.colorized(issue.expected, "green"),
                "but received",
                utils.Printer.colorized(utils.Printer.stringify(issue.received), "red"),
            ]),
            issue.message !== undefined && `${utils.Printer.indent(1)}↳ ${issue.message}`,
        ])),
        error.issues.length === 0 && "No issue found",
    ]);
}
function interpretExecOptionError(error) {
    return utils.Printer.renderParagraph([
        utils.Printer.colorizedBold("Invalid options", "red"),
        error.issues.map((issue) => utils.Printer.renderParagraph([
            issue.type === "option"
                && issue.target
                && utils.Printer.render([
                    utils.Printer.indent(1),
                    utils.Printer.colorizedBold("OPTION: ", "magenta"),
                    `--${issue.target}`,
                ], ""),
            utils.Printer.renderLine([
                utils.Printer.colorizedBold("✖", "red"),
                issue.parserPath && utils.Printer.colorizedBold(issue.parserPath, "cyan"),
                "expected",
                utils.Printer.colorized(issue.expected, "green"),
                "but received",
                utils.Printer.colorized(utils.Printer.stringify(issue.received), "red"),
            ]),
            issue.message !== undefined && `${utils.Printer.indent(1)}↳ ${issue.message}`,
        ])),
        error.issues.length === 0 && "No issue found",
    ]);
}

exports.SymbolCommandError = SymbolCommandError;
exports.addDataParserError = addDataParserError;
exports.addIssue = addIssue;
exports.createError = createError;
exports.interpretCommandError = interpretCommandError;
exports.interpretExecOptionError = interpretExecOptionError;
exports.popErrorPath = popErrorPath;
exports.setErrorPath = setErrorPath;
