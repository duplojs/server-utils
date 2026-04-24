import { Printer } from '@duplojs/utils';

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
    return Printer.renderParagraph([
        Printer.render([
            Printer.colorizedBold("Command failed", "red"),
            Printer.back,
            Printer.indent(1),
            Printer.colorizedBold("COMMAND: ", "cyan"),
            error.issues[0]?.commandPath.join(" ") ?? error.currentCommandPath.join(" "),
        ], ""),
        error.issues.map((issue) => Printer.renderParagraph([
            issue.type === "option"
                && issue.target
                && Printer.render([
                    Printer.indent(1),
                    Printer.colorizedBold("OPTION: ", "magenta"),
                    `--${issue.target}`,
                ], ""),
            issue.type === "subject"
                && issue.parserPath
                && Printer.render([
                    Printer.indent(1),
                    Printer.colorizedBold("SUBJECT:", "magenta"),
                ], ""),
            Printer.renderLine([
                Printer.colorizedBold("✖", "red"),
                issue.parserPath && Printer.colorizedBold(issue.parserPath, "cyan"),
                "expected",
                Printer.colorized(issue.expected, "green"),
                "but received",
                Printer.colorized(Printer.stringify(issue.received), "red"),
            ]),
            issue.message !== undefined && `${Printer.indent(1)}↳ ${issue.message}`,
        ])),
        error.issues.length === 0 && "No issue found",
    ]);
}
function interpretExecOptionError(error) {
    return Printer.renderParagraph([
        Printer.colorizedBold("Invalid options", "red"),
        error.issues.map((issue) => Printer.renderParagraph([
            issue.type === "option"
                && issue.target
                && Printer.render([
                    Printer.indent(1),
                    Printer.colorizedBold("OPTION: ", "magenta"),
                    `--${issue.target}`,
                ], ""),
            Printer.renderLine([
                Printer.colorizedBold("✖", "red"),
                issue.parserPath && Printer.colorizedBold(issue.parserPath, "cyan"),
                "expected",
                Printer.colorized(issue.expected, "green"),
                "but received",
                Printer.colorized(Printer.stringify(issue.received), "red"),
            ]),
            issue.message !== undefined && `${Printer.indent(1)}↳ ${issue.message}`,
        ])),
        error.issues.length === 0 && "No issue found",
    ]);
}

export { SymbolCommandError, addDataParserError, addIssue, createError, interpretCommandError, interpretExecOptionError, popErrorPath, setErrorPath };
