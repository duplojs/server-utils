'use strict';

var utils = require('@duplojs/utils');

exports.Printer = void 0;
(function (Printer) {
    const codeColors = {
        reset: "\x1b[0m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        gray: "\x1b[90m",
        bold: "\x1b[1m",
    };
    Printer.colorsEnum = utils.createEnum([
        "red",
        "RED",
        "green",
        "GREEN",
        "yellow",
        "YELLOW",
        "blue",
        "BLUE",
        "magenta",
        "MAGENTA",
        "cyan",
        "CYAN",
        "gray",
        "GRAY",
    ]);
    Printer.tab = "\t";
    Printer.back = "\n";
    Printer.dash = "-";
    const regexCapitalize = /[A-Z]/;
    function colorized(input, color) {
        const text = `${codeColors[utils.S.toLowerCase(color)]}${input}${codeColors.reset}`;
        if (utils.S.test(color, regexCapitalize)) {
            return `${codeColors.bold}${text}${codeColors.reset}`;
        }
        return text;
    }
    Printer.colorized = colorized;
    function indent(level) {
        return utils.S.repeat(Printer.tab, level);
    }
    Printer.indent = indent;
    function parenthesize(input) {
        return `(${input})`;
    }
    Printer.parenthesize = parenthesize;
    function colorizedOption(option, color) {
        return colorized(utils.pipe(option.aliases, utils.A.map((alias) => `-${alias},`), utils.A.push(`--${option.name}`), utils.A.join(" ")), color);
    }
    Printer.colorizedOption = colorizedOption;
    function render(values) {
        // eslint-disable-next-line no-console
        console.log(...values);
    }
    Printer.render = render;
})(exports.Printer || (exports.Printer = {}));
