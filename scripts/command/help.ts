import { A, DP, hasSomeKinds, isType, justReturn, P, pipe } from "@duplojs/utils";
import type { Command } from "./create";
import { Printer } from "./printer";

function formatSubject(subject: DP.DataParser): string {
	return P.match(subject)
		.when(
			DP.identifier(DP.stringKind),
			justReturn("string"),
		)
		.when(
			DP.identifier(DP.numberKind),
			justReturn("number"),
		)
		.when(
			DP.identifier(DP.bigIntKind),
			justReturn("bigint"),
		)
		.when(
			DP.identifier(DP.dateKind),
			justReturn("date"),
		)
		.when(
			DP.identifier(DP.timeKind),
			justReturn("time"),
		)
		.when(
			DP.identifier(DP.nilKind),
			justReturn("null"),
		)
		.when(
			DP.identifier(DP.literalKind),
			(subject) => pipe(
				subject.definition.value,
				A.map(String),
				A.join(" | "),
			),
		)
		.when(
			DP.identifier(DP.templateLiteralKind),
			(subject) => pipe(
				subject.definition.template,
				A.map(
					(part) => DP.identifier(part, DP.dataParserKind)
						? `\${${formatSubject(part)}}`
						: String(part),
				),
				A.join(""),
			),
		)
		.when(
			DP.identifier(DP.unionKind),
			(subject) => pipe(
				subject.definition.options,
				A.map(formatSubject),
				A.join(" | "),
			),
		)
		.when(
			DP.identifier(DP.arrayKind),
			(subject) => `${formatSubject(subject.definition.element)}[]`,
		)
		.when(
			DP.identifier(DP.tupleKind),
			(subject) => {
				const parts = pipe(
					subject.definition.shape,
					A.map(formatSubject),
					A.join(", "),
				);
				const rest = subject.definition.rest
					? `${parts ? ", " : ""}...${formatSubject(subject.definition.rest)}[]`
					: "";

				return `[${parts}${rest}]`;
			},
		)
		.otherwise(justReturn("unknown"));
}

export function logHelp(
	command: Command,
	depth = 0,
) {
	Printer.render(
		[
			Printer.indent(depth),
			Printer.colorized("NAME:", "GREEN"),
			command.name,
		],
	);
	if (command.description) {
		Printer.render(
			[
				Printer.indent(depth + 1),
				Printer.colorized("DESCRIPTION:", "CYAN"),
				Printer.back,
				Printer.indent(depth + 1),
				command.description,
			],
		);
	}
	if (A.minElements(command.options, 1)) {
		const optionLines: string[] = [];

		command.options.forEach((option, index) => {
			optionLines.push(
				Printer.indent(depth + 1),
				Printer.dash,
				Printer.colorized(` ${option.name}: `, "cyan"),
				Printer.colorizedOption(option, "gray"),
			);

			if (option.description) {
				optionLines.push(
					Printer.back,
					Printer.indent(depth + 1),
					`   ${option.description}`,
				);
			}

			if (index < command.options.length - 1) {
				optionLines.push(Printer.back);
			}
		});

		Printer.render(
			[
				Printer.indent(depth + 1),
				Printer.colorized("OPTIONS:", "BLUE"),
				Printer.back,
				...optionLines,
			],
		);
	}
	if (isType(command.subject, "array")) {
		for (const childCommand of command.subject) {
			logHelp(childCommand, depth + 1);
		}
	} else if (DP.identifier(command.subject, DP.dataParserKind)) {
		const formattedSubject = formatSubject(command.subject);

		Printer.render(
			[
				Printer.indent(depth + 1),
				Printer.colorized("SUBJECT:", "MAGENTA"),
				hasSomeKinds(command.subject, [DP.tupleKind, DP.arrayKind])
					? formattedSubject
					: `<${formattedSubject}>`,
			],
		);
	}
}
