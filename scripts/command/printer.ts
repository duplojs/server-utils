import { A, createEnum, type GetEnumValue, pipe, S } from "@duplojs/utils";
import type { Option } from "./options";

export namespace Printer {
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
	} as const;

	export const colorsEnum = createEnum([
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

	export type ColorEnum = GetEnumValue<typeof colorsEnum>;

	export const tab = "\t" as const;
	export const back = "\n" as const;
	export const dash = "-" as const;

	const regexCapitalize = /[A-Z]/;
	export function colorized(input: string, color: ColorEnum) {
		const text = `${codeColors[S.toLowerCase(color)]}${input}${codeColors.reset}`;

		if (
			S.test(color, regexCapitalize)
		) {
			return `${codeColors.bold}${text}${codeColors.reset}`;
		}

		return text;
	}

	export function indent(level: number) {
		return S.repeat(tab, level);
	}

	export function parenthesize(input: string) {
		return `(${input})`;
	}

	export function colorizedOption(option: Option, color: ColorEnum) {
		return colorized(
			pipe(
				option.aliases,
				A.map((alias) => `-${alias},`),
				A.push(`--${option.name}`),
				A.join(" "),
			),
			color,
		);
	}

	export function render(values: string[]) {
		// eslint-disable-next-line no-console
		console.log(...values);
	}
}
