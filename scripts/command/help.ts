import { A, DP, hasSomeKinds, isType, justReturn, P, pipe, Printer } from "@duplojs/utils";
import type { Command } from "./create";

/**
 * @internal
 */
export function formatSubject(subject: DP.DataParser): string {
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

/**
 * @internal
 */
export function renderCommandHelp(
	command: Command,
	depth: number,
): string[] {
	const logs: string[] = [];

	logs.push(
		`${Printer.indent(depth)}${Printer.colorizedBold("NAME:", "green")}${command.name}`,
	);

	if (command.description) {
		logs.push(
			Printer.renderParagraph(
				[
					`${Printer.indent(depth + 1)}${Printer.colorizedBold("DESCRIPTION:", "cyan")}`,
					`${Printer.indent(depth + 1)}${command.description}`,
				],
			),
		);
	}

	if (A.minElements(command.options, 1)) {
		logs.push(
			Printer.renderParagraph(
				[
					`${Printer.indent(depth + 1)}${Printer.colorizedBold("OPTIONS:", "blue")}`,
					A.map(
						command.options,
						(option) => Printer.renderParagraph(
							[
								A.join(
									[
										Printer.indent(depth + 1),
										Printer.dash,
										Printer.colorized(` ${option.name}: `, "cyan"),
										Printer.colorized(
											pipe(
												option.aliases,
												A.map((alias) => `-${alias},`),
												A.push(`--${option.name}`),
												A.join(" "),
											),
											"gray",
										),
									],
									"",
								),
								option.description
								&& `${Printer.indent(depth + 1)}  ${option.description}`,
							],
						),
					),
				],
			),
		);
	}

	if (isType(command.subject, "array")) {
		for (const childCommand of command.subject) {
			logs.push(...renderCommandHelp(childCommand, depth + 1));
		}
	} else if (DP.identifier(command.subject, DP.dataParserKind)) {
		const formattedSubject = formatSubject(command.subject);

		logs.push(
			A.join(
				[
					Printer.indent(depth + 1),
					Printer.colorizedBold("SUBJECT:", "magenta"),
					hasSomeKinds(command.subject, [DP.tupleKind, DP.arrayKind])
						? formattedSubject
						: `<${formattedSubject}>`,
				],
				"",
			),
		);
	}

	return logs;
}

export function logHelp(
	command: Command,
	depth = 0,
) {
	// eslint-disable-next-line no-console
	console.log(
		Printer.renderParagraph(
			renderCommandHelp(command, depth),
		),
	);
}
