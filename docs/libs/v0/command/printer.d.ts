import { type GetEnumValue } from "@duplojs/utils";
import type { Option } from "./options";
export declare namespace Printer {
    const colorsEnum: {
        red: "red";
        RED: "RED";
        green: "green";
        GREEN: "GREEN";
        yellow: "yellow";
        YELLOW: "YELLOW";
        blue: "blue";
        BLUE: "BLUE";
        magenta: "magenta";
        MAGENTA: "MAGENTA";
        cyan: "cyan";
        CYAN: "CYAN";
        gray: "gray";
        GRAY: "GRAY";
        toTuple: () => ["red", "RED", "green", "GREEN", "yellow", "YELLOW", "blue", "BLUE", "magenta", "MAGENTA", "cyan", "CYAN", "gray", "GRAY"];
        has: (value: string) => value is "red" | "RED" | "green" | "GREEN" | "yellow" | "YELLOW" | "blue" | "BLUE" | "magenta" | "MAGENTA" | "cyan" | "CYAN" | "gray" | "GRAY";
    };
    type ColorEnum = GetEnumValue<typeof colorsEnum>;
    const tab: "\t";
    const back: "\n";
    const dash: "-";
    function colorized(input: string, color: ColorEnum): string;
    function indent(level: number): string;
    function parenthesize(input: string): string;
    function colorizedOption(option: Option, color: ColorEnum): string;
    function render(values: string[]): void;
}
